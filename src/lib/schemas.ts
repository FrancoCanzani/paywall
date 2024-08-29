import { z } from "zod";

export const ArticleSchema = z.object({
  title: z.string(),
  content: z.string(),
  textContent: z.string(),
  length: z.number(),
  siteName: z.string(),
  byline: z.string().nullable(),
  dir: z.string().nullable(),
  lang: z.string().nullable(),
});
