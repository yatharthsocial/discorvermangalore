import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type {
  BreadcrumbList,
  CollectionPage,
  EducationalOrganization,
  FAQPage,
  ItemList,
} from "schema-dts";
import logo from "@/assets/dm-logo.png";
import { EducationDirectory } from "@/components/EducationDirectory";
import { JsonLd } from "@/components/JsonLd";
import { faqs, forFilter, institutions } from "@/lib/education";
import { absoluteUrl } from "@/lib/site";

const description =
  "Schools, medical, engineering, MBA, hotel management and mass media colleges in and around Mangaluru, led by Alva's Education Foundation and Rajeshwari National School, Sanoor.";

const alvas = institutions.find((i) => i.id === "alvas-education-foundation");

export const metadata: Metadata = {
  // Kept to ~60 characters (without the site-name suffix) so Google shows it in full.
  title: {
    absolute: "Education in Mangaluru | Alva's & Rajeshwari National School",
  },
  description,
  keywords: [
    "education in Mangaluru",
    "schools in Mangaluru",
    "medical colleges in Mangalore",
    "engineering colleges in Mangalore",
    "MBA colleges in Mangalore",
    "hotel management colleges in Mangalore",
    "mass media colleges in Mangalore",
    "Alva's Education Foundation",
    "Alva's Moodbidri",
    "Rajeshwari National School Sanoor",
  ],
  alternates: { canonical: "/education" },
  openGraph: {
    type: "website",
    url: "/education",
    title: "Education in Mangaluru: schools and colleges",
    description,
    images: alvas?.image ? [{ url: alvas.image.src }] : undefined,
  },
};

export default function EducationPage() {
  const url = absoluteUrl("/education");
  const ordered = forFilter("all");

  const organizations: EducationalOrganization[] = ordered.map((i) => ({
    "@type": "EducationalOrganization",
    "@id": `${url}#${i.id}`,
    name: i.name,
    ...(i.summary ? { description: i.summary } : {}),
    ...(i.website ? { url: i.website } : {}),
    ...(i.image ? { image: absoluteUrl(i.image.src) } : {}),
    address: {
      "@type": "PostalAddress",
      addressLocality: i.area,
      addressRegion: "Karnataka",
      addressCountry: "IN",
    },
  }));

  const list: ItemList = {
    "@type": "ItemList",
    "@id": `${url}#institutions`,
    name: "Educational institutions in and around Mangaluru",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: ordered.map((i, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: { "@id": `${url}#${i.id}` },
    })),
  };

  const page: CollectionPage = {
    "@type": "CollectionPage",
    "@id": `${url}#page`,
    name: "Education in Mangaluru",
    description,
    url,
    mainEntity: { "@id": `${url}#institutions` },
    about: institutions
      .filter((i) => i.featured)
      .map((i) => ({ "@id": `${url}#${i.id}` })),
    publisher: { "@id": absoluteUrl("/#organization") },
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
      {
        "@type": "ListItem",
        position: 2,
        name: "Education & Universities",
        item: url,
      },
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
          "@graph": [page, breadcrumbs, list, ...organizations, faqPage],
        }}
      />

      {/* Top bar */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-8 lg:px-12">
        <Link href="/" aria-label="Discover Mangaluru home">
          <Image
            src={logo}
            alt="Discover Mangaluru"
            sizes="160px"
            className="h-9 w-auto"
            preload
          />
        </Link>
        <Link
          href="/#about"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-navy/70 transition-colors hover:text-brand-orange"
        >
          <ArrowLeft aria-hidden className="size-4" />
          Back
        </Link>
      </header>

      {/* Intro */}
      <section className="mx-auto max-w-6xl px-4 pb-12 pt-8 sm:px-8 sm:pt-12 lg:px-12">
        <nav aria-label="Breadcrumb" className="text-sm text-brand-navy/60">
          <Link href="/" className="hover:text-brand-orange">
            Home
          </Link>{" "}
          / <span className="text-brand-navy">Education & Universities</span>
        </nav>

        <h1 className="mt-6">
          <span className="relative z-10 block font-script text-6xl leading-none text-brand-teal sm:text-7xl lg:text-8xl">
            Learn
          </span>
          <span className="relative -mt-3 block max-w-4xl text-balance font-display text-4xl font-bold uppercase leading-[1.05] tracking-tight text-brand-orange sm:-mt-5 sm:text-5xl lg:text-6xl">
            Education & universities in Mangaluru
          </span>
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-relaxed sm:text-xl">
          Mangaluru and the wider Dakshina Kannada district are one of
          India&apos;s best-known education hubs. Browse schools and colleges
          for medicine, engineering, MBA, hotel management and mass media, all
          in one place.
        </p>
      </section>

      {/* Directory */}
      <section
        aria-labelledby="directory-heading"
        className="mx-auto max-w-6xl px-4 pb-24 sm:px-8 lg:px-12"
      >
        <h2
          id="directory-heading"
          className="mb-5 font-display text-sm font-semibold uppercase tracking-[0.3em] text-brand-teal"
        >
          Find an institution
        </h2>
        <EducationDirectory />
      </section>

      {/* FAQ */}
      <section
        aria-labelledby="faq-heading"
        className="bg-white px-4 py-20 sm:px-8"
      >
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
                className="group rounded-2xl bg-brand-sand p-5 ring-1 ring-black/5"
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
