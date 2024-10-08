"use server";

import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";
import {
  fixImageSources,
  fixLinks,
  preserveVideos,
  reinsertVideos,
} from "./handle-media";
import { z } from "zod";
import { checkRateLimit } from "./check-rate-limit";
import { ArticleSchema } from "../schemas";
import { getClientIP } from "./get-client-ip";
import { USER_AGENTS, REFERERS } from "../constants";
import { incrementFailureCount, incrementSuccessCount } from "./success-rate";

type Article = z.infer<typeof ArticleSchema>;

interface ArticleResponse {
  article?: Article;
  error?: string;
}

async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeout: number
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response;
  } finally {
    clearTimeout(timeoutId);
  }
}

async function tryFetchWithUserAgents(url: string): Promise<string> {
  for (const [name, userAgent] of Object.entries(USER_AGENTS)) {
    try {
      const response = await fetchWithTimeout(
        url,
        {
          headers: { "User-Agent": userAgent },
        },
        15000
      );
      return await response.text();
    } catch (error) {
      console.log(`Failed to fetch with ${name} user agent:`, error);
    }
  }
  throw new Error("Failed to fetch content with all user agents");
}

async function tryFetchWithReferers(url: string): Promise<string> {
  for (const referer of REFERERS) {
    try {
      const response = await fetchWithTimeout(
        url,
        {
          headers: {
            "User-Agent": USER_AGENTS.default,
            Referer: referer,
          },
        },
        15000
      );
      return await response.text();
    } catch (error) {
      console.log(`Failed to fetch with referer ${referer}:`, error);
    }
  }
  throw new Error("Failed to fetch content with all referers");
}

async function tryFetchFromArchives(url: string): Promise<string> {
  const waybeckUrl = `https://web.archive.org/web/2/${url}`;
  try {
    const response = await fetchWithTimeout(
      waybeckUrl,
      {
        headers: { "User-Agent": USER_AGENTS.default },
      },
      20000
    );
    return await response.text();
  } catch (error) {
    console.log(`Failed to fetch from Wayback Machine: ${waybeckUrl}`, error);
  }

  // Try other archives if the Wayback Machine fails
  const archives = [
    `https://archive.is/latest/${url}`,
    `https://webcache.googleusercontent.com/search?q=cache:${url}`,
  ];

  for (const archiveUrl of archives) {
    try {
      const response = await fetchWithTimeout(
        archiveUrl,
        {
          headers: { "User-Agent": USER_AGENTS.default },
        },
        20000
      );
      return await response.text();
    } catch (error) {
      console.log(`Failed to fetch from archive ${archiveUrl}:`, error);
    }
  }

  throw new Error("Failed to fetch content from all archives");
}

export async function getArticleContent(url: string): Promise<ArticleResponse> {
  const clientIP = getClientIP();
  const isAllowed = true;
  // replaces checkratelimit

  if (!isAllowed) {
    return { error: "Rate limit exceeded. Please try again later." };
  }

  try {
    let html: string;
    const urlHostname = new URL(url).hostname;

    // For Bloomberg, try archive first
    if (urlHostname === "www.bloomberg.com") {
      try {
        html = await tryFetchFromArchives(url);
        await incrementSuccessCount(url);
      } catch (error) {
        console.log(
          "Failed to fetch Bloomberg article from archives, trying other methods"
        );
        try {
          html = await tryFetchWithUserAgents(url);
          await incrementSuccessCount(url);
        } catch (error) {
          html = await tryFetchWithReferers(url);
          await incrementSuccessCount(url);
        }
      }
    } else {
      // For non-Bloomberg URLs, use the original order
      try {
        html = await tryFetchWithUserAgents(url);
        await incrementSuccessCount(url);
      } catch (error) {
        console.log("Failed with user agents, trying referers");
        try {
          html = await tryFetchWithReferers(url);
          await incrementSuccessCount(url);
        } catch (error) {
          console.log("Failed with referers, trying archives");
          html = await tryFetchFromArchives(url);
          await incrementSuccessCount(url);
        }
      }
    }

    const dom = new JSDOM(html, { url });
    const doc = dom.window.document;

    fixImageSources(doc, url);
    fixLinks(doc, url);
    preserveVideos(doc);

    const reader = new Readability(doc);
    const article = reader.parse();

    if (!article) {
      await incrementFailureCount(url);
      throw new Error("Failed to extract article content");
    }

    const processedContent = reinsertVideos(article.content || "");

    const articleData: Article = {
      title: article.title || "",
      content: processedContent,
      textContent: article.textContent || "",
      length: article.textContent?.length || 0,
      siteName: article.siteName || urlHostname,
      byline: article.byline || null,
      dir: article.dir || null,
      lang: article.lang || null,
    };

    const validatedArticle = ArticleSchema.parse(articleData);

    return { article: validatedArticle };
  } catch (err) {
    await incrementFailureCount(url);
    let errorMessage: string;

    if (err instanceof z.ZodError) {
      errorMessage = "Article data validation failed";
      console.error("Zod validation errors:", JSON.stringify(err.errors));
    } else if (err instanceof Error) {
      errorMessage = err.message;
    } else {
      errorMessage = "An unknown error occurred";
    }

    return { error: errorMessage };
  }
}
