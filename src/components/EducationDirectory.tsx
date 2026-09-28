"use client";

import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import {
  categories,
  type Filter,
  forFilter,
  type Institution,
} from "@/lib/education";

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  ...categories,
];

const labelFor = Object.fromEntries(categories.map((c) => [c.id, c.label]));

/** Editorial, guidebook-style directory: text tabs and ruled rows. Every entry is the same height. */
export function EducationDirectory() {
  const [filter, setFilter] = useState<Filter>("all");
  const list = forFilter(filter);

  return (
    <div>
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
              onClick={() => setFilter(f.id)}
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

      {/* Entries. Re-keyed on filter change so they fade in again. */}
      <ul
        key={filter}
        aria-live="polite"
        className="grid md:grid-cols-2 md:gap-x-14"
      >
        {list.map((inst) => (
          <Entry key={inst.id} inst={inst} />
        ))}
      </ul>
    </div>
  );
}

function Entry({ inst }: { inst: Institution }) {
  const meta = [
    ...inst.categories.map((c) => labelFor[c]),
    inst.area,
  ].join("  ·  ");

  return (
    <li
      id={inst.id}
      className="fade-up relative flex min-h-28 scroll-mt-8 items-center gap-5 border-b border-brand-navy/10 py-6"
    >
      {/* Slim orange rule marks the featured institutions */}
      {inst.featured && (
        <span
          aria-hidden
          className="absolute -left-4 top-6 bottom-6 w-[3px] rounded-full bg-brand-orange md:-left-5"
        />
      )}

      <div className="min-w-0 flex-1">
        {inst.featured && (
          <p className="mb-1.5 font-display text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-brand-orange">
            Featured
          </p>
        )}
        <h3 className="flex items-start gap-2.5 font-display text-xl font-semibold uppercase leading-tight tracking-wide text-brand-navy sm:text-2xl">
          {inst.alvas && (
            <span
              aria-label="Part of Alva's Education Foundation"
              className="mt-2.5 size-2 shrink-0 rounded-full bg-brand-orange"
            />
          )}
          <span>{inst.name}</span>
        </h3>
        <p className="mt-1.5 whitespace-pre text-sm text-neutral-500">
          {meta}
        </p>
      </div>

      {/* Official website: a normal (followed) link, so it passes on search visibility. */}
      {inst.website && (
        <a
          href={inst.website}
          target="_blank"
          rel="noopener"
          aria-label={`Visit the official website of ${inst.name}`}
          className="inline-flex shrink-0 items-center gap-1.5 self-center rounded-full border border-brand-navy/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-brand-navy"
        >
          Website
          <ArrowUpRight aria-hidden className="size-3.5 text-brand-orange" />
        </a>
      )}
    </li>
  );
}
