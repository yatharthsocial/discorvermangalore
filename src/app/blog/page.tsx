import type { Metadata } from "next";
import Link from "next/link";
import type { Blog } from "schema-dts";
import { JsonLd } from "@/components/JsonLd";
import { getAllPosts } from "@/lib/posts";
import { absoluteUrl, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description: `Articles, guides and answers from ${site.name}.`,
  alternates: { canonical: "/blog" },
  openGraph: { url: "/blog", title: `Blog | ${site.name}` },
};

const dateFmt = new Intl.DateTimeFormat("en-IN", { dateStyle: "medium" });

export default function BlogIndex() {
  const posts = getAllPosts();

  const blog: Blog = {
    "@type": "Blog",
    "@id": absoluteUrl("/blog#blog"),
    name: `${site.name} Blog`,
    url: absoluteUrl("/blog"),
    publisher: { "@id": absoluteUrl("/#organization") },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: absoluteUrl(`/blog/${p.slug}`),
      datePublished: p.date,
    })),
  };

  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", ...blog }} />
      <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
      <ul className="mt-8 space-y-8">
        {posts.map((p) => (
          <li key={p.slug}>
            <article>
              <h2 className="text-xl font-semibold">
                <Link href={`/blog/${p.slug}`} className="hover:underline">
                  {p.title}
                </Link>
              </h2>
              <p className="mt-1 text-sm opacity-60">
                <time dateTime={p.date}>{dateFmt.format(new Date(p.date))}</time> · {p.readingMinutes} min read
              </p>
              <p className="mt-2 opacity-80">{p.description}</p>
            </article>
          </li>
        ))}
      </ul>
    </>
  );
}
