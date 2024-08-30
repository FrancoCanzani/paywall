export interface BlacklistItem {
  id: number;
  date: string;
  hostname: string;
  full_url: string;
  works: boolean;
}

export interface FrontMatter {
  title: string;
  date: string;
  [key: string]: any;
}

export interface Post {
  slug: string;
  frontMatter: FrontMatter;
}
