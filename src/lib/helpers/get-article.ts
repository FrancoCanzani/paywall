'use server';

import { JSDOM } from 'jsdom';
import { Readability } from '@mozilla/readability';
import {
  fixImageSources,
  fixLinks,
  preserveVideos,
  reinsertVideos,
} from './handle-media';
import { z } from 'zod';
import { checkRateLimit } from './check-rate-limit';
import { ArticleSchema } from '../schemas';
import { getClientIP } from './get-client-ip';
import { USER_AGENTS, REFERERS } from '../constants';

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
          headers: { 'User-Agent': userAgent },
        },
        15000
      );
      return await response.text();
    } catch (error) {
      console.log(`Failed to fetch with ${name} user agent:`, error);
    }
  }
  throw new Error('Failed to fetch content with all user agents');
}

async function tryFetchWithReferers(url: string): Promise<string> {
  for (const referer of REFERERS) {
    try {
      const response = await fetchWithTimeout(
        url,
        {
          headers: {
            'User-Agent': USER_AGENTS.default,
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
  throw new Error('Failed to fetch content with all referers');
}

async function tryFetchFromArchives(url: string): Promise<string> {
  const archives = [
    `https://web.archive.org/web/2/${url}`,
    `https://archive.is/latest/${url}`,
    `https://webcache.googleusercontent.com/search?q=cache:${url}`,
  ];

  for (const archiveUrl of archives) {
    try {
      const response = await fetchWithTimeout(
        archiveUrl,
        {
          headers: { 'User-Agent': USER_AGENTS.default },
        },
        20000
      );
      return await response.text();
    } catch (error) {
      console.log(`Failed to fetch from archive ${archiveUrl}:`, error);
    }
  }
  throw new Error('Failed to fetch content from all archives');
}

export async function getArticleContent(url: string): Promise<ArticleResponse> {
  const clientIP = getClientIP();
  const isAllowed = await checkRateLimit(clientIP);

  if (!isAllowed) {
    return { error: 'Rate limit exceeded. Please try again later.' };
  }

  try {
    let html: string;

    // Try different methods to fetch the content
    try {
      html = await tryFetchWithUserAgents(url);
    } catch (error) {
      console.log('Failed with user agents, trying referers');
      try {
        html = await tryFetchWithReferers(url);
      } catch (error) {
        console.log('Failed with referers, trying archives');
        if (new URL(url).hostname === 'www.bloomberg.com') {
          html = await tryFetchFromArchives(
            `https://web.archive.org/web/2/${url}`
          );
        } else {
          html = await tryFetchFromArchives(url);
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
      throw new Error('Failed to extract article content');
    }

    const processedContent = reinsertVideos(article.content || '');

    const articleData: Article = {
      title: article.title || '',
      content: processedContent,
      textContent: article.textContent || '',
      length: article.textContent?.length || 0,
      siteName: article.siteName || new URL(url).hostname,
      byline: article.byline || null,
      dir: article.dir || null,
      lang: article.lang || null,
    };

    const validatedArticle = ArticleSchema.parse(articleData);

    return { article: validatedArticle };
  } catch (err) {
    let errorMessage: string;

    if (err instanceof z.ZodError) {
      errorMessage = 'Article data validation failed';
      console.error('Zod validation errors:', JSON.stringify(err.errors));
    } else if (err instanceof Error) {
      errorMessage = err.message;
    } else {
      errorMessage = 'An unknown error occurred';
    }

    return { error: errorMessage };
  }
}
