import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { BlogPosting, BreadcrumbList, FAQPage } from "schema-dts";
import { JsonLd } from "@/components/JsonLd";
import { getAllPosts, getPost } from "@/lib/posts";
import { absoluteUrl, site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  const url = `/blog/${post.slug}`;
  const image = post.image ?? site.logo;
  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: post.author ?? site.author.name }],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      tags: post.tags,
      images: [{ url: image, alt: post.title }],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description, images: [image] },
  };
}

const dateFmt = new Intl.DateTimeFormat("en-IN", { dateStyle: "long" });

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const url = absoluteUrl(`/blog/${post.slug}`);

  const article: BlogPosting = {
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.description,
    abstract: post.summary,
    image: absoluteUrl(post.image ?? site.logo),
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: { "@type": "Person", name: post.author ?? site.author.name },
    publisher: { "@id": absoluteUrl("/#organization") },
    mainEntityOfPage: url,
    keywords: post.tags.join(", "),
    timeRequired: `PT${post.readingMinutes}M`,
    inLanguage: "en",
  };

  const breadcrumbs: BreadcrumbList = {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  const faq: FAQPage | null = post.faqs.length
    ? {
        "@type": "FAQPage",
        mainEntity: post.faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }
    : null;

  const graph = [article, breadcrumbs, ...(faq ? [faq] : [])];

  return (
    <article>
      <JsonLd data={{ "@context": "https://schema.org", "@graph": graph }} />

      <nav aria-label="Breadcrumb" className="text-sm opacity-60">
        <Link href="/" className="hover:underline">Home</Link> /{" "}
        <Link href="/blog" className="hover:underline">Blog</Link>
      </nav>

      <header className="mt-4">
        <h1 className="text-4xl font-bold tracking-tight">{post.title}</h1>
        <p className="mt-3 text-sm opacity-60">
          By {post.author ?? site.author.name} ·{" "}
          <time dateTime={post.date}>{dateFmt.format(new Date(post.date))}</time>
          {post.updated && (
            <> · Updated <time dateTime={post.updated}>{dateFmt.format(new Date(post.updated))}</time></>
          )}{" "}
          · {post.readingMinutes} min read
        </p>
      </header>

      {post.summary && (
        <aside className="mt-6 rounded-lg border border-black/10 bg-black/[0.03] p-4 dark:border-white/15 dark:bg-white/5">
          <p className="text-xs font-semibold uppercase tracking-wide opacity-60">Quick answer</p>
          <p className="mt-1">{post.summary}</p>
        </aside>
      )}

      <div
        className="prose prose-neutral mt-8 max-w-none dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />

      {post.faqs.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Frequently asked questions</h2>
          <div className="mt-4 space-y-3">
            {post.faqs.map((f) => (
              <details key={f.question} className="rounded-lg border border-black/10 p-4 dark:border-white/15">
                <summary className="cursor-pointer font-medium">{f.question}</summary>
                <p className="mt-2 opacity-80">{f.answer}</p>
              </details>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
