import { getAllPosts } from "@/lib/posts";
import { absoluteUrl, site } from "@/lib/site";

// llms.txt (https://llmstxt.org) — a plain-text index that helps AI assistants find and cite content.
export const dynamic = "force-static";

export function GET() {
  const posts = getAllPosts();
  const body = [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    "## Guides",
    "",
    `- [Education in Mangaluru](${absoluteUrl("/education")}): Directory of schools and medical, engineering, MBA, hotel management and mass media colleges in and around Mangaluru, led by Alva's Education Foundation (Moodbidri) and Rajeshwari National School (Sanoor).`,
    "",
    "## Blog",
    "",
    ...posts.map((p) => `- [${p.title}](${absoluteUrl(`/blog/${p.slug}`)}): ${p.summary ?? p.description}`),
    "",
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
