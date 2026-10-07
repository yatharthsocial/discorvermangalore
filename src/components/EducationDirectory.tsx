"use client";

import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  ChefHat,
  Cog,
  GraduationCap,
  type LucideIcon,
  Newspaper,
  School,
  Stethoscope,
} from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import {
  categories,
  type CategoryId,
  type Filter,
  forFilter,
  type Institution,
} from "@/lib/education";

const PAGE_SIZE = 6;

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  ...categories,
];

const labelFor = Object.fromEntries(categories.map((c) => [c.id, c.label]));

// Shown on the thumbnail until an institution has its own photo.
const iconFor: Record<CategoryId, LucideIcon> = {
  school: School,
  medical: Stethoscope,
  engineering: Cog,
  mba: Briefcase,
  hotel: ChefHat,
  media: Newspaper,
};

/** Editorial, guidebook-style directory: text tabs, ruled rows with a thumbnail, 6 per page. */
export function EducationDirectory() {
  const [filter, setFilter] = useState<Filter>("all");
  const [page, setPage] = useState(0);
  const topRef = useRef<HTMLDivElement>(null);

  const all = forFilter(filter);
  const pageCount = Math.max(1, Math.ceil(all.length / PAGE_SIZE));
  const list = all.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  const choose = (f: Filter) => {
    setFilter(f);
    setPage(0);
  };
  const goTo = (p: number) => {
    setPage(p);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div ref={topRef} className="scroll-mt-8">
      {/* Filters: text tabs with an underline on the active one */}
      <div
        role="group"
        aria-label="Filter institutions by type"
        className="-mx-4 flex gap-7 overflow-x-auto border-b border-brand-navy/15 px-4 sm:mx-0 sm:flex-wrap sm:gap-x-8 sm:gap-y-2 sm:px-0"
      >
        {filters.map((f) => {
          const active = f.id === filter;
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={active}
              onClick={() => choose(f.id)}
              className={`relative -mb-px shrink-0 whitespace-nowrap border-b-2 pb-3 pt-1 font-display text-sm font-semibold uppercase tracking-[0.18em] ${
                active
                  ? "border-brand-orange text-brand-navy"
                  : "border-transparent text-brand-navy/45"
              }`}
            >
              {f.label}
              <sup className="ml-1 font-sans text-[0.65rem] font-semibold tracking-normal text-brand-orange">
                {forFilter(f.id).length}
              </sup>
            </button>
          );
        })}
      </div>

      {/* Entries. Re-keyed on filter/page change so they fade in again. */}
      <ul
        key={`${filter}-${page}`}
        aria-live="polite"
        className="grid md:grid-cols-2 md:gap-x-14"
      >
        {list.map((inst) => (
          <Entry key={inst.id} inst={inst} filter={filter} />
        ))}
      </ul>

      {/* Pagination */}
      {pageCount > 1 && (
        <nav
          aria-label="Institution pages"
          className="mt-10 flex items-center justify-between gap-4"
        >
          <button
            type="button"
            onClick={() => goTo(page - 1)}
            disabled={page === 0}
            className="inline-flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-[0.18em] text-brand-navy disabled:opacity-30"
          >
            <ArrowLeft aria-hidden className="size-4" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          <ol className="flex items-center gap-1.5">
            {Array.from({ length: pageCount }, (_, i) => (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Page ${i + 1}`}
                  aria-current={i === page ? "page" : undefined}
                  className={`grid size-9 place-items-center rounded-full font-display text-sm font-semibold ${
                    i === page
                      ? "bg-brand-navy text-white"
                      : "text-brand-navy/60"
                  }`}
                >
                  {i + 1}
                </button>
              </li>
            ))}
          </ol>

          <button
            type="button"
            onClick={() => goTo(page + 1)}
            disabled={page === pageCount - 1}
            className="inline-flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-[0.18em] text-brand-navy disabled:opacity-30"
          >
            <span className="hidden sm:inline">Next</span>
            <ArrowRight aria-hidden className="size-4" />
          </button>
        </nav>
      )}
    </div>
  );
}

function Thumb({ inst, filter }: { inst: Institution; filter: Filter }) {
  const Icon = inst.categories[0] ? iconFor[inst.categories[0]] : GraduationCap;
  // In a category view, use that category's photo if the institution has one.
  const categoryImage =
    filter === "all" ? undefined : inst.categoryImages?.[filter];
  const image = categoryImage ?? inst.image;
  const label = filter === "all" ? undefined : labelFor[filter];
  return (
    <div className="relative size-20 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-brand-orange/15 via-white to-brand-teal/20 ring-1 ring-brand-navy/10 sm:size-24">
      {image ? (
        <Image
          src={image}
          alt={
            categoryImage
              ? `${inst.name}, ${label} campus, ${inst.area}`
              : (inst.imageAlt ?? inst.name)
          }
          fill
          placeholder="blur"
          sizes="96px"
          className="object-cover"
          style={{
            objectPosition: categoryImage ? undefined : inst.imagePosition,
          }}
        />
      ) : (
        <Icon
          aria-hidden
          strokeWidth={1.4}
          className="absolute left-1/2 top-1/2 size-8 -translate-x-1/2 -translate-y-1/2 text-brand-orange/60"
        />
      )}
    </div>
  );
}

function Entry({ inst, filter }: { inst: Institution; filter: Filter }) {
  // In a category view, only that category is listed; under "All", every category it offers.
  const shown = filter === "all" ? inst.categories : [filter];
  const meta = [...shown.map((c) => labelFor[c]), inst.area].join("  ·  ");

  return (
    <li
      id={inst.id}
      className="fade-up relative flex min-h-32 scroll-mt-8 items-center gap-5 border-b border-brand-navy/10 py-6"
    >
      {/* Slim orange rule marks the featured institutions */}
      {inst.featured && (
        <span
          aria-hidden
          className="absolute -left-4 top-6 bottom-6 w-[3px] rounded-full bg-brand-orange md:-left-5"
        />
      )}

      <Thumb inst={inst} filter={filter} />

      <div className="min-w-0 flex-1">
        {inst.featured && (
          <p className="mb-1 font-display text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-brand-orange">
            Featured
          </p>
        )}
        <h3 className="flex items-start gap-2 font-display text-lg font-semibold uppercase leading-tight tracking-wide text-brand-navy sm:text-xl">
          <span>{inst.name}</span>
        </h3>
        <p className="mt-1 text-sm text-neutral-500">{meta}</p>

        {/* Official website: a normal (followed) link, so it passes on search visibility. */}
        {inst.website && (
          <a
            href={inst.website}
            target="_blank"
            rel="noopener"
            aria-label={`Visit the official website of ${inst.name}`}
            className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-brand-navy/20 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-brand-navy"
          >
            Website
            <ArrowUpRight aria-hidden className="size-3.5 text-brand-orange" />
          </a>
        )}
      </div>
    </li>
  );
}
