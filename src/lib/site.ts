// Central site config. Update these values for the client.
export const site = {
  name: "Vidyakashi",
  title: "Vidyakashi Blog",
  description:
    "Local travel guide to Mangaluru (Mangalore): best places to visit, beaches, temples, Kambala and festivals, Mangalorean food and practical tips.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  locale: "en_IN",
  logo: "/vidyakashilogo.png",
  twitter: "", // e.g. "@vidyakashi"
  sameAs: [] as string[], // social profile URLs, used in Organization schema
  author: {
    name: "Vidyakashi Team",
  },
};

export const absoluteUrl = (path = "/") => new URL(path, site.url).toString();
