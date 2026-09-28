import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";

const POSTS_DIR = path.join(process.cwd(), "content/blog");

export type Faq = { question: string; answer: string };

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  author?: string;
  image?: string;
  tags: string[];
  // Short, direct answer shown at the top of the post — the main AEO lever.
  summary?: string;
  faqs: Faq[];
  draft: boolean;
  readingMinutes: number;
};

export type Post = PostMeta & { html: string };

function readPostFile(file: string) {
  const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const meta: PostMeta = {
    slug: file.replace(/\.md$/, ""),
    title: data.title,
    description: data.description,
    date: new Date(data.date).toISOString(),
    updated: data.updated ? new Date(data.updated).toISOString() : undefined,
    author: data.author,
    image: data.image,
    tags: data.tags ?? [],
    summary: data.summary,
    faqs: data.faqs ?? [],
    draft: data.draft ?? false,
    readingMinutes: Math.max(1, Math.round(readingTime(content).minutes)),
  };
  return { meta, content };
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => readPostFile(f).meta)
    .filter((p) => !p.draft || process.env.NODE_ENV === "development")
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPost(slug: string): Promise<Post | null> {
  const file = `${slug}.md`;
  if (!fs.existsSync(path.join(POSTS_DIR, file))) return null;
  const { meta, content } = readPostFile(file);
  const html = String(
    await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypeSlug)
      .use(rehypeStringify)
      .process(content),
  );
  return { ...meta, html };
}
