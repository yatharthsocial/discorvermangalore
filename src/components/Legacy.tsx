import { LegacyTimeline } from "./LegacyTimeline";

const fields = [
  "Banking",
  "Mangalore tiles",
  "Cashew",
  "Port & shipping",
  "Hospitality",
  "Education",
  "Yakshagana",
];

const milestones = [
  {
    year: "1860",
    title: "Mangalore Tiles",
    text: "The Basel Mission's first tile factory, roofing homes across India.",
  },
  {
    year: "1906",
    title: "Canara Bank",
    text: "Ammembal Subba Rao Pai's bank, now one of India's largest.",
  },
  {
    year: "1924",
    title: "Karnataka Bank",
    text: "Born in Mangaluru and still headquartered here today.",
  },
  {
    year: "1931",
    title: "Vijaya Bank",
    text: "Founded by A. B. Shetty, now part of Bank of Baroda.",
  },
  {
    year: "1974",
    title: "New Mangalore Port",
    text: "Opened at Panambur as Karnataka's gateway for sea trade.",
  },
];

export function Legacy() {
  return (
    <section
      id="legacy"
      aria-labelledby="legacy-heading"
      className="relative overflow-x-clip bg-brand-navy px-4 py-24 text-white sm:px-8 sm:py-32 lg:px-12"
    >
      <div className="mx-auto max-w-6xl">
        {/* On desktop the heading and timeline stick together while the years light up (see LegacyTimeline). */}
        <LegacyTimeline
          milestones={milestones}
          header={
            <div className="reveal mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/60">
                Proud legacy
              </p>
              <h2 id="legacy-heading" className="mt-4">
                <span className="relative z-10 block font-script text-6xl leading-none text-brand-teal sm:text-7xl lg:text-8xl">
                  Proudly
                </span>
                <span className="relative -mt-3 block font-display text-5xl font-bold uppercase leading-none tracking-tight text-brand-orange sm:-mt-5 sm:text-6xl lg:text-7xl">
                  Made in Mangaluru
                </span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-white/80 sm:text-xl">
                Mangaluru has always punched above its weight. This coastal city
                gave India some of its best-known banks, the red-tiled roofs
                still seen across the country and a port that carries
                Karnataka&apos;s trade to the world.
              </p>
              <ul
                className="mt-8 flex flex-wrap justify-center gap-2"
                aria-label="Known for"
              >
                {fields.map((f) => (
                  <li
                    key={f}
                    className="rounded-full border border-white/20 px-4 py-1.5 text-sm text-white/80"
                  >
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          }
        />
      </div>
    </section>
  );
}
