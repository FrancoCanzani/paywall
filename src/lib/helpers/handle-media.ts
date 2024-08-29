import { JSDOM } from "jsdom";

export function fixImageSources(doc: Document, url: string) {
  doc.querySelectorAll("img").forEach((img) => {
    const src = img.getAttribute("src");
    if (src && src.startsWith("/")) {
      img.setAttribute("src", new URL(src, url).toString());
    }
  });
}

export function fixLinks(doc: Document, url: string) {
  doc.querySelectorAll("a").forEach((a) => {
    const href = a.getAttribute("href");
    if (href && href.startsWith("/")) {
      a.setAttribute("href", new URL(href, url).toString());
    }
  });
}

export function preserveVideos(doc: Document) {
  const videos = doc.querySelectorAll(
    'video, iframe[src*="youtube.com"], iframe[src*="vimeo.com"]'
  );
  videos.forEach((video) => {
    video.setAttribute("data-preserve", "true");
  });
}

export function reinsertVideos(content: string): string {
  const tempDoc = new JSDOM(content).window.document;
  const preservedVideos = tempDoc.querySelectorAll('[data-preserve="true"]');
  preservedVideos.forEach((video) => {
    video.removeAttribute("data-preserve");
  });
  return tempDoc.body.innerHTML;
}
