import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/dm-logo.png";
import { site } from "@/lib/site";

const topics = [
  "Education & Universities",
  "Beaches",
  "Temples & Heritage",
  "Arts & Culture",
  "Cuisine",
  "Local Tips",
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-brand-sand text-brand-navy">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 pb-10 pt-16 sm:px-8 sm:pt-20 lg:grid-cols-12 lg:px-12">
        {/* Brand */}
        <div className="lg:col-span-5">
          <Link
            href="/"
            aria-label="Discover Mangaluru home"
            className="inline-block"
          >
            <Image
              src={logo}
              alt="Discover Mangaluru"
              sizes="180px"
              className="h-11 w-auto"
            />
          </Link>
          <p className="mt-5 max-w-sm leading-relaxed text-neutral-600">
            {site.description}
          </p>
        </div>

        {/* Topics */}
        <div className="lg:col-span-5 lg:col-start-8">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-brand-teal">
            What we cover
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {topics.map((t) => (
              <li
                key={t}
                className="rounded-full border border-brand-navy/15 bg-white/60 px-3.5 py-1.5 text-sm text-brand-navy/80"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Big faint wordmark, echoing the hero. It sits fully above the divider line. */}
      <p
        aria-hidden
        className="pointer-events-none select-none whitespace-nowrap pb-4 text-center font-display text-[clamp(3.5rem,14vw,12rem)] font-bold uppercase leading-none tracking-tight text-brand-navy/[0.06]"
      >
        Mangaluru
      </p>

      <div className="border-t border-brand-navy/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-sm text-brand-navy/60 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <p>
            © {new Date().getFullYear()} Discover Mangaluru. All rights
            reserved.
          </p>
          <p>Made by Yatharth</p>
        </div>
      </div>
    </footer>
  );
}
