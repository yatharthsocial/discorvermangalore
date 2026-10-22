import { getAllPosts } from "@/lib/posts";
import { absoluteUrl, site } from "@/lib/site";

// llms.txt (https://llmstxt.org): a plain-text index that helps AI assistants find and cite content.
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
    `- [Arts & culture of Mangaluru](${absoluteUrl("/culture")}): Alva's Virasat (Moodbidri), Yakshagana, Bhuta Kola, Kambala, Mangaluru Dasara, Pili Vesha, Christmas at Milagres Church and Monti Fest, with when to see them and visitor etiquette.`,
    `- [Mangalorean cuisine](${absoluteUrl("/cuisine")}): Dishes to try in Mangaluru, including chicken ghee roast, kori rotti, neer dosa, bangude pulimunchi, fish rava fry, goli baje, patrode and gadbad ice cream, with spice levels.`,
    `- [Temples & heritage of Mangaluru](${absoluteUrl("/temples")}): Kadri Manjunatha and Mangaladevi temples, St Aloysius Chapel, Milagres and Rosario churches, Zeenath Baksh Masjid, Ullal Dargah, Moodbidri's thousand-pillared basadi and Sultan Battery, with visitor etiquette.`,
    `- [Beaches of Mangaluru](${absoluteUrl("/beaches")}): Panambur, Tannirbhavi, Someshwara, Ullal, Surathkal, Sasihithlu and Bengre beaches, with local tips, safety advice and the best time to visit.`,
    `- [Education in Mangaluru](${absoluteUrl("/education")}): Directory of schools and medical, engineering, MBA, hotel management and mass media colleges in and around Mangaluru, led by Alva's Education Foundation (Moodbidri).`,
    "",
    "## Blog",
    "",
    ...posts.map((p) => `- [${p.title}](${absoluteUrl(`/blog/${p.slug}`)}): ${p.summary ?? p.description}`),
    "",
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
