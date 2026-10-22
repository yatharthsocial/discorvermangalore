import {
  ArrowRight,
  Compass,
  GraduationCap,
  Landmark,
  Palette,
  Waves,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import alvasCollegeImg from "@/assets/about/alvas-pu-college-moodbidri.jpg";
import beachImg from "@/assets/about/mangaluru-beach-rocks.jpeg";
import kadriTempleImg from "@/assets/about/kadri-temple-mangaluru.jpeg";
import yakshaganaImg from "@/assets/about/yakshagana-performer.jpg";
import cuisineImg from "@/assets/about/kori-rotti-mangalorean-cuisine.jpg";
import localTipsImg from "@/assets/about/aerial-river-temple-mangaluru.jpeg";

// To add a photo to a card: put it in src/assets/about/, import it at the top
// (e.g. `import beachesImg from "@/assets/about/beaches.jpg";`) and set `image: beachesImg`.
// Photos fill a fixed 4:5 portrait frame, so any size or shape keeps the cards aligned.
const cards: {
  icon: LucideIcon;
  title: string;
  text: string;
  image?: StaticImageData;
  imageAlt?: string;
  // Which part of the photo stays in view when it is trimmed to the frame (CSS object-position).
  imagePosition?: string;
  // Where "Read more" goes. Defaults to the blog until each topic has its own page or article.
  href?: string;
}[] = [
  {
    icon: GraduationCap,
    title: "Education & Universities",
    href: "/education",
    image: alvasCollegeImg,
    imageAlt:
      "Alva's Pre-University College building with a Yakshagana figure statue at the entrance",
    imagePosition: "50% 30%",
    text: "Colleges, universities and courses in Mangaluru, from NITK Surathkal and Mangalore University to leading medical and engineering colleges.",
  },
  {
    icon: Waves,
    title: "Beaches",
    href: "/beaches",
    image: beachImg,
    imageAlt:
      "Aerial view of a long sandy beach near Mangaluru with waves breaking on large rocks",
    imagePosition: "50% 62%",
    text: "Panambur, Tannirbhavi, Someshwara and quieter stretches of coast, plus the best times to go and what to expect.",
  },
  {
    icon: Landmark,
    title: "Temples & Heritage",
    href: "/temples",
    image: kadriTempleImg,
    imageAlt:
      "Blue temple gopuram with golden deity sculptures at Kadri, Mangaluru",
    imagePosition: "50% 25%",
    text: "Kadri, Mangaladevi, Zeenath Baksh Masjid, St. Aloysius Chapel and the stories behind the city's landmarks.",
  },
  {
    icon: Palette,
    title: "Arts & Culture",
    href: "/culture",
    image: yakshaganaImg,
    imageAlt:
      "Yakshagana artist in traditional costume, painted face and ornate golden headdress",
    imagePosition: "50% 30%",
    text: "The traditions, languages and crafts that make Tulunadu unlike anywhere else.",
  },
  {
    icon: UtensilsCrossed,
    title: "Cuisine",
    href: "/cuisine",
    image: cuisineImg,
    imageAlt:
      "Mangalorean kori rotti: chicken curry in a bowl with crisp rice wafers on the side",
    imagePosition: "55% 50%",
    text: "Ghee roast, neer dosa, fresh catch and the places where locals actually eat.",
  },
  {
    icon: Compass,
    title: "Local Tips",
    image: localTipsImg,
    imageAlt:
      "Aerial view of red-roofed buildings beside a rocky river surrounded by coconut palms near Mangaluru",
    imagePosition: "50% 50%",
    text: "Getting around, where to stay, what to pack for the monsoon and how to plan your days.",
  },
];

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="about-section relative overflow-x-clip bg-brand-sand px-4 py-20 text-neutral-700 sm:px-8 lg:px-12 lg:py-0"
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Text: first on mobile, pinned on the right on desktop while the cards scroll past. */}
        <div className="lg:order-2 lg:col-span-5">
          <div className="relative lg:sticky lg:top-0 lg:flex lg:h-svh lg:items-center">
            {/* Beach at sunrise/sunset: the sun rises out of the sea, crosses the sky and sinks back below the
                horizon as you scroll (see .sun-* in globals.css), with its reflection following it on the water.
                Static if the browser can't do scroll animations. */}
            <svg
              aria-hidden
              viewBox="0 0 200 200"
              className="sun-scene pointer-events-none absolute -right-10 top-0 w-56 sm:w-72 lg:top-1/2 lg:w-96 lg:-translate-y-1/2 xl:w-[28rem]"
              fill="none"
              strokeWidth="6"
              strokeLinecap="round"
            >
              <defs>
                {/* Everything above the flat sea horizon, so the sun disappears into the water, not behind a wave. */}
                <clipPath id="sun-horizon">
                  <rect x="-60" y="-60" width="320" height="194" />
                </clipPath>
                {/* Soft left/right edges so the beach melts into the page instead of ending in a hard box. */}
                <linearGradient id="shore-fade-x" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="white" stopOpacity="0" />
                  <stop offset="0.3" stopColor="white" stopOpacity="1" />
                  <stop offset="0.75" stopColor="white" stopOpacity="1" />
                  <stop offset="1" stopColor="white" stopOpacity="0" />
                </linearGradient>
                <mask id="shore-fade">
                  <rect
                    x="0"
                    y="100"
                    width="200"
                    height="100"
                    fill="url(#shore-fade-x)"
                  />
                </mask>
                <linearGradient id="sand" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#e9d3ae" stopOpacity="0.6" />
                  <stop offset="1" stopColor="#e9d3ae" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="0"
                    stopColor="var(--color-brand-teal)"
                    stopOpacity="0.28"
                  />
                  <stop
                    offset="1"
                    stopColor="var(--color-brand-teal)"
                    stopOpacity="0.08"
                  />
                </linearGradient>
              </defs>

              <g clipPath="url(#sun-horizon)">
                <g className="sun">
                  <circle className="sun-glow" cx="100" cy="90" r="66" />
                  <circle className="sun-disc" cx="100" cy="90" r="42" />
                  <path
                    className="sun-rays"
                    d="M100 26V8M146 44l12-12M54 44 42 32M164 90h18M18 90h18"
                    stroke="currentColor"
                  />
                </g>
              </g>

              <g mask="url(#shore-fade)">
                {/* Sea */}
                <rect
                  x="-10"
                  y="134"
                  width="220"
                  height="44"
                  fill="url(#sea)"
                />
                <path
                  d="M-10 134H210"
                  stroke="var(--color-brand-navy)"
                  strokeOpacity="0.12"
                  strokeWidth="2"
                />

                {/* Sun's reflection on the water */}
                <g
                  className="sun-reflection"
                  stroke="var(--color-brand-orange)"
                  strokeWidth="4"
                >
                  <path d="M78 142h44M86 151h28M92 160h16" />
                </g>

                {/* Gentle surf lines */}
                <path
                  d="M8 166c10-5 20-5 30 0s20 5 30 0M120 158c10-5 20-5 30 0s20 5 30 0"
                  stroke="var(--color-brand-navy)"
                  strokeOpacity="0.1"
                  strokeWidth="3"
                />

                {/* Sand */}
                <path
                  d="M0 182c40-10 80-12 120-6s60 4 80-2V200H0Z"
                  fill="url(#sand)"
                />

                {/* Palm tree, on the right so it stays clear of the paragraph */}
                <g
                  fill="var(--color-brand-navy)"
                  fillOpacity="0.14"
                  transform="translate(115 0)"
                >
                  <path d="M31 184c1-24 3-45 10-62l4 1c-6 17-8 38-8 61Z" />
                  <path d="M43 121c-9-8-22-10-33-5 11-1 22 2 31 9ZM43 121c-4-11-14-18-26-19 10 4 18 11 23 21ZM43 121c3-11 12-19 24-21-9 5-17 12-21 22ZM43 121c10-6 23-6 33 1-11-3-22-1-31 5ZM43 121c-2 10-8 18-16 23 7-7 11-15 13-24Z" />
                </g>
              </g>
            </svg>

            <div className="relative text-center lg:text-left">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-navy/70">
                About us
              </p>
              <h2 id="about-heading" className="mt-4">
                <span className="relative z-10 block font-script text-6xl leading-none text-brand-teal sm:text-7xl lg:text-8xl">
                  Discover
                </span>
                <span className="relative -mt-3 block text-balance font-display text-4xl font-bold uppercase leading-tight tracking-tight text-brand-orange sm:-mt-6 sm:text-5xl xl:text-6xl">
                  Mangaluru like a local
                </span>
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed sm:text-xl lg:mx-0">
                Discover Mangaluru is a local travel guide to Mangaluru
                (Mangalore), the coastal heart of Karnataka. Find the best
                places to visit and things to do, from Panambur and Tannirbhavi
                beaches to Kadri and Kudroli temples, Kambala races, Mangaluru
                Dasara and authentic Mangalorean food. Every guide is written by
                people who live here: honest, first-hand and practical, so you
                know where to go, what to eat and when to visit, and can explore
                Tulunadu like a local.
              </p>
            </div>
          </div>
        </div>

        {/* Cards: two staggered columns on desktop. They start a full screen below, so none show until you scroll, and the
            bottom padding (a screen plus the 8rem stagger) lets the last card scroll completely out of view before the
            pinned text is released and the next section arrives. */}
        <ul className="mx-auto grid w-full max-w-sm gap-6 sm:max-w-2xl sm:grid-cols-2 lg:order-1 lg:col-span-7 lg:max-w-[40rem] lg:gap-8 lg:pb-[calc(100svh+8rem)] lg:pt-[100vh]">
          {cards.map(
            ({
              icon: Icon,
              title,
              text,
              image,
              imageAlt,
              imagePosition,
              href = "/blog",
            }) => (
              <li
                key={title}
                className="scroll-card flex flex-col rounded-3xl bg-white p-3 shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-lg sm:even:translate-y-16 lg:even:translate-y-32"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gradient-to-br from-brand-orange/15 via-brand-sand to-brand-teal/15">
                  {image ? (
                    <Image
                      src={image}
                      alt={imageAlt ?? title}
                      fill
                      placeholder="blur"
                      sizes="(min-width: 1024px) 20rem, (min-width: 640px) 50vw, 24rem"
                      className="object-cover"
                      style={{ objectPosition: imagePosition }}
                    />
                  ) : (
                    <Icon
                      aria-hidden
                      strokeWidth={1.25}
                      className="absolute left-1/2 top-1/2 size-20 -translate-x-1/2 -translate-y-1/2 text-brand-orange/40"
                    />
                  )}
                </div>
                <div className="flex flex-1 flex-col px-3 pb-4 pt-5">
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-orange/10 text-brand-orange">
                      <Icon aria-hidden className="size-5" />
                    </span>
                    <h3 className="font-display text-xl font-semibold uppercase leading-tight tracking-wide text-brand-navy">
                      {title}
                    </h3>
                  </div>
                  <p className="mt-3 leading-relaxed text-neutral-600">
                    {text}
                  </p>
                  <Link
                    href={href}
                    aria-label={`Read more about ${title}`}
                    className="group/more mt-auto inline-flex w-fit items-center gap-1.5 pt-4 font-display text-sm font-semibold uppercase tracking-[0.15em] text-brand-orange transition-colors hover:text-brand-navy"
                  >
                    Read more
                    <ArrowRight
                      aria-hidden
                      className="size-4 transition-transform duration-300 group-hover/more:translate-x-1"
                    />
                  </Link>
                </div>
              </li>
            ),
          )}
        </ul>
      </div>
    </section>
  );
}
