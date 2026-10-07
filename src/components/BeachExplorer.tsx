"use client";

import { ArrowLeft, ArrowRight, Lightbulb, MapPin } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { BeachScene } from "@/components/BeachScene";
import { beaches, type GoodFor, goodFor } from "@/lib/beaches";

const COAST =
  "M118 0C110 40 124 80 114 120C106 160 120 200 108 240C100 270 112 296 104 330C98 360 110 390 102 430C96 470 108 500 102 520";

/**
 * Interactive coast explorer: pick a beach on the map, in the strip of cards, with the arrows, the keyboard
 * (left/right) or by swiping the scene. "Good for" filters highlight matching beaches.
 */
export function BeachExplorer() {
  const [active, setActive] = useState(2); // Panambur
  const [tag, setTag] = useState<GoodFor | null>(null);
  const touchX = useRef<number | null>(null);
  const stripRef = useRef<HTMLDivElement>(null);

  const beach = beaches[active];
  // The selected beach always stays bright; filters dim only the others.
  const matches = (i: number) =>
    i === active || !tag || beaches[i].goodFor.includes(tag);

  const select = (i: number) => {
    const next = (i + beaches.length) % beaches.length;
    setActive(next);
    // Keep the chosen card visible in the strip.
    stripRef.current
      ?.querySelector<HTMLElement>(`[data-beach="${beaches[next].id}"]`)
      ?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
  };

  return (
    <div
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") select(active + 1);
        if (e.key === "ArrowLeft") select(active - 1);
      }}
    >
      {/* Good-for filters */}
      <div
        role="group"
        aria-label="Filter beaches by what they are good for"
        className="-mx-4 flex gap-2 overflow-x-auto px-4 py-1 sm:mx-0 sm:flex-wrap sm:px-px"
      >
        {goodFor.map((g) => {
          const on = tag === g;
          return (
            <button
              key={g}
              type="button"
              aria-pressed={on}
              onClick={() => setTag(on ? null : g)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                on
                  ? "bg-brand-orange text-white"
                  : "bg-white text-brand-navy/70 ring-1 ring-brand-navy/10"
              }`}
            >
              {g}
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-6">
        {/* Desktop: map, photo and details in three columns. The map and photo are the same height and stay
            pinned side by side while the page scrolls, so they never drift apart. */}
        {/* Coastline map */}
        <div className="hidden lg:sticky lg:top-6 lg:col-span-3 lg:block">
          <div className="relative h-[32rem] overflow-hidden rounded-[2rem] bg-brand-navy p-6 text-white">
            <p className="font-display text-xs font-semibold uppercase tracking-[0.3em] text-brand-teal">
              The coastline
            </p>
            <svg
              viewBox="0 0 200 520"
              // Stretch to the card so the pins (positioned in %) always sit on the coastline.
              preserveAspectRatio="none"
              className="absolute inset-x-6 bottom-6 top-14 h-[calc(100%-5rem)] w-[calc(100%-3rem)] [&_path]:[vector-effect:non-scaling-stroke]"
              aria-hidden
            >
              {/* Sea on the left, land on the right */}
              <path
                d={`${COAST}L0 520L0 0Z`}
                fill="#3fa2c2"
                fillOpacity="0.12"
              />
              <path d={COAST} stroke="#3fa2c2" strokeWidth="2" fill="none" />
              <path
                d={COAST}
                transform="translate(-10 0)"
                stroke="#3fa2c2"
                strokeOpacity="0.35"
                strokeDasharray="2 6"
                fill="none"
              />
              {/* Rivers reaching the sea */}
              <path
                d="M200 270C170 276 150 262 128 286C120 296 112 300 106 304"
                stroke="#3fa2c2"
                strokeOpacity="0.6"
                strokeWidth="3"
                fill="none"
              />
              <path
                d="M200 380C176 372 150 384 128 372C118 368 110 366 104 368"
                stroke="#3fa2c2"
                strokeOpacity="0.6"
                strokeWidth="3"
                fill="none"
              />
            </svg>

            <span
              aria-hidden
              className="absolute bottom-6 left-6 top-14 flex items-center [writing-mode:vertical-rl] rotate-180 text-[10px] uppercase tracking-[0.4em] text-white/25"
            >
              Arabian Sea
            </span>

            {/* Pins (real buttons, positioned over the map) */}
            <div className="absolute inset-x-6 bottom-6 top-14">
              {beaches.map((b, i) => {
                const on = i === active;
                const dim = !matches(i);
                return (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => select(i)}
                    aria-label={b.name}
                    aria-pressed={on}
                    className={`absolute flex -translate-y-1/2 items-center gap-2 transition-opacity duration-300 ${
                      dim ? "opacity-25" : "opacity-100"
                    }`}
                    style={{
                      top: `${(b.y / 520) * 100}%`,
                      left: "calc(55% - 0.5rem)",
                    }}
                  >
                    <span className="relative grid size-4 place-items-center">
                      {on && (
                        <span className="absolute inset-0 animate-ping rounded-full bg-brand-orange/70" />
                      )}
                      <span
                        className={`relative size-3 rounded-full ring-2 transition-transform duration-300 ${
                          on
                            ? "scale-125 bg-brand-orange ring-white"
                            : "bg-brand-orange/80 ring-brand-orange/30"
                        }`}
                      />
                    </span>
                    <span
                      className={`whitespace-nowrap text-xs font-semibold transition-colors duration-300 ${
                        on ? "text-white" : "text-white/55"
                      }`}
                    >
                      {b.name.replace(" Beach", "")}
                    </span>
                  </button>
                );
              })}
            </div>
            <span className="absolute right-6 top-6 text-[10px] uppercase tracking-widest text-white/35">
              N ↑
            </span>
          </div>
        </div>

        {/* Photo (or illustrated scene) of the selected beach */}
        <div className="min-w-0 lg:sticky lg:top-6 lg:col-span-5">
          <div
            className="relative aspect-[16/10] overflow-hidden rounded-[2rem] shadow-lg ring-1 ring-black/5 sm:aspect-[16/9] lg:aspect-auto lg:h-[32rem]"
            onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              if (Math.abs(dx) > 40) select(active + (dx < 0 ? 1 : -1));
              touchX.current = null;
            }}
          >
            <div key={beach.id} className="scene-in absolute inset-0">
              {beach.image ? (
                <Image
                  src={beach.image}
                  alt={beach.imageAlt ?? beach.name}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 30rem, 100vw"
                  className="object-cover"
                />
              ) : (
                <BeachScene beach={beach} />
              )}
            </div>

            {/* Counter and arrows */}
            <div className="absolute inset-x-4 bottom-4 flex items-center justify-between">
              <span className="rounded-full bg-brand-navy/80 px-3 py-1 font-display text-xs font-semibold tracking-[0.2em] text-white backdrop-blur">
                {active + 1} / {beaches.length}
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => select(active - 1)}
                  aria-label="Previous beach"
                  className="grid size-11 place-items-center rounded-full bg-white/90 text-brand-navy shadow backdrop-blur"
                >
                  <ArrowLeft className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={() => select(active + 1)}
                  aria-label="Next beach"
                  className="grid size-11 place-items-center rounded-full bg-brand-orange text-white shadow"
                >
                  <ArrowRight className="size-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Details */}
        <article aria-live="polite" className="min-w-0 lg:col-span-4">
          <div key={`${beach.id}-text`} className="panel-rise lg:pt-2">
            <p className="inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-[0.15em] text-brand-teal">
              <MapPin aria-hidden className="size-4" />
              {beach.area}
            </p>
            <h3 className="mt-2 font-display text-4xl font-bold uppercase leading-none tracking-tight text-brand-navy sm:text-5xl lg:text-4xl">
              {beach.name}
            </h3>
            <p className="mt-2 font-script text-3xl text-brand-orange lg:text-2xl">
              {beach.tagline}
            </p>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed lg:text-base">
              {beach.description}
            </p>

            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Good for">
              {beach.goodFor.map((g) => (
                <li
                  key={g}
                  className={`rounded-full px-3 py-1 text-sm font-medium ${
                    g === tag
                      ? "bg-brand-orange text-white"
                      : "bg-brand-orange/10 text-brand-orange"
                  }`}
                >
                  {g}
                </li>
              ))}
            </ul>

            <p className="mt-6 flex max-w-2xl gap-3 rounded-2xl bg-white p-4 text-brand-navy shadow-sm ring-1 ring-black/5">
              <Lightbulb
                aria-hidden
                className="mt-0.5 size-5 shrink-0 text-brand-orange"
              />
              <span>
                <strong>Local tip: </strong>
                {beach.tip}
              </span>
            </p>
          </div>
        </article>
      </div>

      {/* Strip of all beaches */}
      <div
        ref={stripRef}
        // Padding on every side leaves room for the selected card's lift and outline, which this scrolling
        // row would otherwise clip.
        className="-mx-4 mt-10 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-5 pt-3 sm:-mx-2 sm:scroll-px-2 sm:px-2"
      >
        {beaches.map((b, i) => {
          const on = i === active;
          return (
            <button
              key={b.id}
              data-beach={b.id}
              type="button"
              onClick={() => select(i)}
              aria-pressed={on}
              className={`group w-52 shrink-0 snap-start overflow-hidden rounded-2xl bg-white text-left shadow-sm ring-2 transition-all duration-300 ${
                on ? "-translate-y-1 ring-brand-orange" : "ring-transparent"
              } ${matches(i) ? "opacity-100" : "opacity-35"}`}
            >
              <div className="aspect-[4/3] overflow-hidden">
                {b.image ? (
                  <Image
                    src={b.image}
                    alt=""
                    sizes="208px"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <BeachScene beach={b} />
                )}
              </div>
              <div className="p-3">
                <p className="font-display text-sm font-semibold uppercase tracking-wide text-brand-navy">
                  {b.name}
                </p>
                <p className="mt-0.5 truncate text-xs text-neutral-500">
                  {b.tagline}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
