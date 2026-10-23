import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Camera,
  Hand,
  MapPin,
  Shirt,
  VolumeX,
} from "lucide-react";

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { BreadcrumbList, Event, FAQPage, ItemList } from "schema-dts";
import heroImg from "@/assets/culture/bhuta-kola.jpg";
import logo from "@/assets/dm-logo.png";
import { CultureExplorer } from "@/components/CultureExplorer";
import { JsonLd } from "@/components/JsonLd";
import { faqs, traditions, virasat } from "@/lib/culture";
import { absoluteUrl } from "@/lib/site";

const description =
  "Arts and culture of Mangaluru and Tulunadu: Alva's Nudisiri 2027, Yakshagana, Bhuta Kola, Kambala, Mangaluru Dasara, Pili Vesha, Christmas at Milagres and Monti Fest, with when to see them.";

export const metadata: Metadata = {
  title: {
    absolute:
      "Arts & Culture of Mangaluru: Alva's Nudisiri 2027, Yakshagana, Kola",
  },
  description,
  keywords: [
    "Mangalore culture",
    "Tulunadu culture",
    "Alva's Nudisiri 2027",
    "Alva's Nudisiri Virasat",
    "Alva's Virasat",
    "Yakshagana",
    "Bhuta Kola",
    "Kambala",
    "Mangaluru Dasara",
    "Pili Vesha",
    "Christmas Milagres Church",
  ],
  alternates: { canonical: "/culture" },
  openGraph: {
    type: "website",
    url: "/culture",
    title: "Arts & culture of Mangaluru",
    description,
    images: [{ url: heroImg.src }],
  },
};

const etiquette = [
  {
    icon: Hand,
    title: "Rituals are sacred",
    text: "Bhuta Kola and temple rituals are acts of faith, not performances. Watch respectfully.",
  },
  {
    icon: Camera,
    title: "Ask before photos",
    text: "Some rituals do not allow photography or flash. Check first.",
  },
  {
    icon: Shirt,
    title: "Dress modestly",
    text: "Cover shoulders and knees at temples, churches and rituals.",
  },
  {
    icon: VolumeX,
    title: "Stay quiet",
    text: "Keep phones on silent during Yakshagana, masses and rituals.",
  },
];

export default function CulturePage() {
  const url = absoluteUrl("/culture");

  const virasatEvent: Event = {
    "@type": "Event",
    "@id": `${url}#alvas-virasat`,
    name: virasat.fullName,
    description: virasat.summary,
    startDate: virasat.startDate,
    endDate: virasat.endDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    image: absoluteUrl(virasat.image.src),
    organizer: {
      "@type": "Organization",
      name: virasat.organiser,
      url: virasat.website,
    },
    location: {
      "@type": "Place",
      name: virasat.place,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Moodbidri",
        addressRegion: "Karnataka",
        addressCountry: "IN",
      },
    },
  };

  const list: ItemList = {
    "@type": "ItemList",
    name: "Arts and cultural traditions of Mangaluru",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: { "@id": `${url}#alvas-virasat` },
      },
      ...traditions.map((t, i) => ({
        "@type": "ListItem" as const,
        position: i + 2,
        name: t.name,
        description: t.story,
      })),
    ],
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
      { "@type": "ListItem", position: 2, name: "Arts & Culture", item: url },
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
          "@graph": [breadcrumbs, virasatEvent, list, faqPage],
        }}
      />

      {/* Hero: full-width photo, matching the Beaches, Temples and Cuisine pages. */}
      <section className="relative isolate flex h-[78svh] min-h-[520px] max-h-[760px] flex-col overflow-hidden bg-brand-navy lg:h-[65svh] lg:min-h-[480px] lg:max-h-[680px]">
        <Image
          src={heroImg}
          alt="Bhuta Kola performer in a painted mask, flower garlands and a costume of coconut fronds"
          fill
          preload
          placeholder="blur"
          sizes="100vw"
          className="-z-20 object-cover object-[50%_22%]"
        />
        {/* Darken the top for the header and the bottom for the text; keep the photo visible in between. */}
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
            <span className="text-white">Arts & Culture</span>
          </nav>
          <h1 className="mt-3 drop-shadow-[0_2px_12px_rgba(10,49,94,0.45)]">
            <span className="block font-script text-5xl leading-none text-brand-gold sm:text-6xl">
              Tradition
            </span>
            <span className="-mt-2 block text-balance font-display text-[2.4rem] font-bold uppercase leading-[0.95] tracking-tight sm:-mt-3 sm:text-5xl xl:text-6xl">
              Arts & culture of Tulunadu
            </span>
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
            All-night Yakshagana, the sacred Bhuta Kola, buffalo races through
            paddy fields and festivals shared by every faith. Discover the
            living traditions of Mangaluru and coastal Karnataka.
          </p>
        </div>
      </section>

      {/* Featured: Alva's Nudisiri 2027 */}
      <section
        aria-labelledby="virasat-heading"
        className="mx-auto max-w-6xl px-4 pt-16 sm:px-8 sm:pt-20 lg:px-12"
      >
        <p className="mb-5 font-display text-sm font-semibold uppercase tracking-[0.3em] text-brand-teal">
          Don&apos;t miss
        </p>
        <article
          id="alvas-virasat"
          className="grid scroll-mt-8 overflow-hidden rounded-[2rem] bg-white shadow-sm ring-2 ring-brand-orange/30 lg:grid-cols-2"
        >
          {/* The poster is shown whole (a poster must not be cropped), over a blurred copy of itself. */}
          <div className="relative aspect-[4/5] overflow-hidden bg-[#7a1f1f] sm:aspect-[4/3] lg:aspect-auto lg:min-h-[32rem]">
            <Image
              src={virasat.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 36rem, 100vw"
              className="scale-110 object-cover opacity-60 blur-2xl"
            />
            <div className="absolute inset-4 sm:inset-6">
              <Image
                src={virasat.image}
                alt={virasat.imageAlt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 24rem, 80vw"
                className="object-contain drop-shadow-2xl"
              />
            </div>
            <span className="absolute left-4 top-4 rounded-full bg-brand-orange px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-white">
              Upcoming festival
            </span>
          </div>
          <div className="flex flex-col p-7 sm:p-10">
            <p className="inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-[0.15em] text-brand-teal">
              <MapPin aria-hidden className="size-4" />
              {virasat.place}
            </p>
            <h2
              id="virasat-heading"
              className="mt-3 font-display text-4xl font-bold uppercase leading-none tracking-tight text-brand-navy sm:text-5xl"
            >
              {virasat.name}
            </h2>
            <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-neutral-500">
              <CalendarDays aria-hidden className="size-4 text-brand-orange" />
              {virasat.season}
            </p>
            <p className="mt-1 font-script text-2xl text-brand-orange">
              &ldquo;{virasat.theme}&rdquo;
            </p>
            <p className="mt-5 text-lg leading-relaxed">{virasat.summary}</p>
            <ul className="mt-5 space-y-2">
              {virasat.highlights.map((h) => (
                <li key={h} className="flex gap-3">
                  <span
                    aria-hidden
                    className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand-orange"
                  />
                  {h}
                </li>
              ))}
            </ul>
            {/* Official website: a normal (followed) link, so it passes on search visibility. */}
            <a
              href={virasat.website}
              target="_blank"
              rel="noopener"
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-brand-navy px-6 py-3 text-sm font-semibold text-white"
            >
              Visit the Alva&apos;s Nudisiri website
              <ArrowUpRight aria-hidden className="size-4" />
            </a>
          </div>
        </article>
      </section>

      {/* Traditions */}
      <section
        aria-labelledby="traditions-heading"
        className="mx-auto max-w-6xl px-4 py-16 sm:px-8 sm:py-20 lg:px-12"
      >
        <h2
          id="traditions-heading"
          className="mb-5 font-display text-sm font-semibold uppercase tracking-[0.3em] text-brand-teal"
        >
          Living traditions
        </h2>
        <CultureExplorer />
      </section>

      {/* Etiquette */}
      <section
        aria-labelledby="etiquette-heading"
        className="bg-brand-navy px-4 py-20 text-white sm:px-8"
      >
        <div className="mx-auto max-w-6xl lg:px-4">
          <h2
            id="etiquette-heading"
            className="font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl"
          >
            Watching with respect
          </h2>
          <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {etiquette.map(({ icon: Icon, title, text }) => (
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
