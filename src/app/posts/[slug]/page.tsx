import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { FrontMatter } from "@/lib/types";
import { MDXRemote } from "next-mdx-remote/rsc";
import ArticleScrollBar from "@/components/article-scroll-bar";
import Header from "@/components/header";

interface PostProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), "src", "mdx");
  const filenames = fs.readdirSync(postsDirectory);

  return filenames.map((filename) => ({
    slug: filename.replace(".mdx", ""),
  }));
}

async function getPostContent(
  slug: string
): Promise<{ content: string; frontMatter: FrontMatter }> {
  const postsDirectory = path.join(process.cwd(), "src", "mdx");
  const filePath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(filePath, "utf8");

  const { content, data } = matter(fileContents);

  return {
    content,
    frontMatter: data as FrontMatter,
  };
}

export default async function Post({ params }: PostProps) {
  const { content, frontMatter } = await getPostContent(params.slug);

  return (
    <>
      <ArticleScrollBar />
      <Header showAnchor />
      <div className="max-w-3xl mx-auto px-4 py-8 prose">
        <h1>{frontMatter.title}</h1>
        <p className="text-sm text-gray-500">
          {new Date(frontMatter.date).toLocaleDateString()}
        </p>
        <MDXRemote source={content} />
      </div>
    </>
  );
}
