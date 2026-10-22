import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const latest = posts[0]?.updated ?? posts[0]?.date;
  return [
    { url: absoluteUrl("/"), lastModified: latest, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/culture"), lastModified: latest, changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/cuisine"), lastModified: latest, changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/temples"), lastModified: latest, changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/beaches"), lastModified: latest, changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/education"), lastModified: latest, changeFrequency: "monthly", priority: 0.9 },
    { url: absoluteUrl("/blog"), lastModified: latest, changeFrequency: "daily", priority: 0.9 },
    ...posts.map((p) => ({
      url: absoluteUrl(`/blog/${p.slug}`),
      lastModified: p.updated ?? p.date,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
