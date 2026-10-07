import { ArrowLeft, CalendarDays, Flag, Sun, Waves } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type {
  Beach as BeachSchema,
  BreadcrumbList,
  FAQPage,
  ItemList,
} from "schema-dts";
import heroImg from "@/assets/about/mangaluru-beach-rocks.jpeg";
import logo from "@/assets/dm-logo.png";
import { BeachExplorer } from "@/components/BeachExplorer";
import { JsonLd } from "@/components/JsonLd";
import { beaches, faqs } from "@/lib/beaches";
import { absoluteUrl } from "@/lib/site";

const description =
  "Explore the best beaches in Mangaluru (Mangalore): Panambur, Tannirbhavi, Someshwara, Ullal, Surathkal, Sasihithlu and Bengre, with local tips and the best time to visit.";

export const metadata: Metadata = {
  title: { absolute: "Best Beaches in Mangaluru (Mangalore) | Local Guide" },
  description,
  keywords: [
    "beaches in Mangaluru",
    "beaches in Mangalore",
    "Panambur beach",
    "Tannirbhavi beach",
    "Someshwara beach",
    "Ullal beach",
    "Surathkal beach",
    "Sasihithlu surfing",
  ],
  alternates: { canonical: "/beaches" },
  openGraph: {
    type: "website",
    url: "/beaches",
    title: "Best beaches in Mangaluru",
    description,
    images: [{ url: heroImg.src }],
  },
};

const tips = [
  {
    icon: CalendarDays,
    title: "Best time",
    text: "October to February brings calm seas and pleasant weather.",
  },
  {
    icon: Waves,
    title: "Monsoon",
    text: "From June to September the sea is rough. Do not go into the water.",
  },
  {
    icon: Flag,
    title: "Stay safe",
    text: "Swim only where lifeguards are on duty and follow their flags.",
  },
  {
    icon: Sun,
    title: "Sunsets",
    text: "Every beach here faces west, so evenings are the main event.",
  },
];

export default function BeachesPage() {
  const url = absoluteUrl("/beaches");

  const places: BeachSchema[] = beaches.map((b) => ({
    "@type": "Beach",
    "@id": `${url}#${b.id}`,
    name: b.name,
    description: b.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mangaluru",
      addressRegion: "Karnataka",
      addressCountry: "IN",
    },
  }));

  const list: ItemList = {
    "@type": "ItemList",
    name: "Beaches in Mangaluru",
    itemListElement: beaches.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: { "@id": `${url}#${b.id}` },
    })),
  };

  const breadcrumbs: BreadcrumbList = {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: absoluteUrl("/"),
      },
      { "@type": "ListItem", position: 2, name: "Beaches", item: url },
    ],
  };

  const faqPage: FAQPage = {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <div className="bg-brand-sand text-neutral-700">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [breadcrumbs, list, ...places, faqPage],
        }}
      />

      {/* Hero: full-width sunset video background. Shorter than the screen so the explorer shows sooner. */}
      <section className="relative isolate flex h-[78svh] min-h-[520px] max-h-[760px] flex-col overflow-hidden bg-brand-navy lg:h-[65svh] lg:min-h-[480px] lg:max-h-[680px]">
        {/* Muted + playsInline so it autoplays on phones; the poster shows while it loads, and stays (video
            hidden) for visitors who prefer reduced motion. */}
        <video
          className="hero-video absolute inset-0 -z-20 h-full w-full object-cover object-[50%_35%]"
          src="/videos/mangaluru-beach-sunset.mp4"
          poster="/videos/mangaluru-beach-sunset-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-30 bg-cover bg-[50%_35%]"
          style={{
            backgroundImage: "url(/videos/mangaluru-beach-sunset-poster.jpg)",
          }}
        />
        {/* Darken the top for the header and the bottom for the text; keep the sunset visible in between. */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-navy/55 via-transparent to-brand-navy/90" />

        <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-8 sm:py-5 lg:px-12">
          <Link
            href="/"
            aria-label="Discover Mangaluru home"
            className="rounded-2xl bg-white/90 px-3 py-2 shadow-sm backdrop-blur"
          >
            <Image
              src={logo}
              alt="Discover Mangaluru"
              sizes="140px"
              className="h-7 w-auto sm:h-8"
              preload
            />
          </Link>
          <Link
            href="/#about"
            className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-4 py-2 text-sm font-semibold text-brand-navy shadow-sm backdrop-blur"
          >
            <ArrowLeft aria-hidden className="size-4" />
            Back
          </Link>
        </header>

        <div className="mx-auto mt-auto w-full max-w-6xl px-4 pb-10 text-white sm:px-8 sm:pb-12 lg:px-12">
          <nav aria-label="Breadcrumb" className="text-sm text-white/75">
            <Link href="/">Home</Link> /{" "}
            <span className="text-white">Beaches</span>
          </nav>
          <h1 className="mt-3 drop-shadow-[0_2px_12px_rgba(10,49,94,0.45)]">
            <span className="block font-script text-5xl leading-none text-brand-gold sm:text-6xl">
              Shores
            </span>
            <span className="-mt-2 block text-balance font-display text-[2.4rem] font-bold uppercase leading-[0.95] tracking-tight sm:-mt-3 sm:text-5xl xl:text-6xl">
              Beaches of Mangaluru
            </span>
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
            Seven beaches along the coast of Mangaluru (Mangalore), from the
            surf at Sasihithlu to the rocks of Someshwara. Pick one on the map
            to explore.
          </p>
        </div>
      </section>

      {/* Explorer */}
      <section
        aria-labelledby="explore-heading"
        className="mx-auto max-w-6xl px-4 py-16 sm:px-8 sm:py-20 lg:px-12"
      >
        <h2
          id="explore-heading"
          className="mb-5 font-display text-sm font-semibold uppercase tracking-[0.3em] text-brand-teal"
        >
          Explore the coast
        </h2>
        <BeachExplorer />
      </section>

      {/* Before you go */}
      <section
        aria-labelledby="tips-heading"
        className="bg-brand-navy px-4 py-20 text-white sm:px-8"
      >
        <div className="mx-auto max-w-6xl lg:px-4">
          <h2
            id="tips-heading"
            className="font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl"
          >
            Before you go
          </h2>
          <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {tips.map(({ icon: Icon, title, text }) => (
              <li key={title}>
                <Icon aria-hidden className="size-7 text-brand-orange" />
                <p className="mt-4 font-display text-lg font-semibold uppercase tracking-wide">
                  {title}
                </p>
                <p className="mt-2 leading-relaxed text-white/70">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-heading" className="px-4 py-20 sm:px-8">
        <div className="mx-auto max-w-3xl">
          <h2
            id="faq-heading"
            className="font-display text-3xl font-bold uppercase tracking-tight text-brand-navy sm:text-4xl"
          >
            Frequently asked questions
          </h2>
          <div className="mt-8 space-y-3">
            {faqs.map((f) => (
              <details
                key={f.question}
                className="group rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-brand-navy">
                  {f.question}
                  <span
                    aria-hidden
                    className="text-xl text-brand-orange transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 leading-relaxed">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
