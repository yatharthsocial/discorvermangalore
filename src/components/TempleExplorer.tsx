"use client";

import {
  Castle,
  Church,
  Clock,
  Columns3,
  Lightbulb,
  type LucideProps,
  MapPin,
  MoonStar,
  X,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { type KindId, kinds, type Place, places } from "@/lib/temples";

// Gopuram (temple tower) in the same line style as the lucide icons.
function Gopuram(props: LucideProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={props.strokeWidth ?? 2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
      aria-hidden
    >
      <path d="M12 2v2M10 4h4l1 3H9zM8 7h8l1 4H7zM6 11h12l1 5H5zM4 16h16v6H4z" />
      <path d="M10 22v-3a2 2 0 0 1 4 0v3" />
    </svg>
  );
}

const iconFor: Record<KindId, (p: LucideProps) => React.ReactNode> = {
  temple: Gopuram,
  church: Church,
  mosque: MoonStar,
  jain: Columns3,
  heritage: Castle,
};

const labelFor = Object.fromEntries(kinds.map((k) => [k.id, k.label]));

function Visual({ place, large = false }: { place: Place; large?: boolean }) {
  const Icon = iconFor[place.kind];
  if (place.image) {
    return (
      <Image
        src={place.image}
        alt={place.imageAlt ?? place.name}
        fill
        placeholder="blur"
        sizes={
          large
            ? "(min-width: 768px) 32rem, 100vw"
            : "(min-width: 1024px) 22rem, (min-width: 640px) 50vw, 100vw"
        }
        className="object-cover"
        style={{ objectPosition: place.imagePosition }}
      />
    );
  }
  return (
    <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_30%_20%,#fbe3cf_0%,#f6c9a6_45%,#e5652a_140%)]">
      {/* Fine line pattern for texture */}
      <div className="absolute inset-0 opacity-[0.12] [background-image:repeating-linear-gradient(135deg,#0a315e_0_1px,transparent_1px_14px)]" />
      <Icon
        strokeWidth={1.1}
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-brand-navy/70 ${
          large ? "size-28" : "size-16"
        }`}
      />
    </div>
  );
}

/** Filterable gallery of sacred and heritage places; tapping one opens a detail panel. */
export function TempleExplorer() {
  const [kind, setKind] = useState<KindId | "all">("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const list = kind === "all" ? places : places.filter((p) => p.kind === kind);
  const open = places.find((p) => p.id === openId) ?? null;

  // Esc closes the panel; focus moves into it when it opens; the page doesn't scroll behind it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenId(null);
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prev;
    };
  }, [open]);

  const filters = [{ id: "all" as const, label: "All" }, ...kinds];

  return (
    <div>
      {/* Filters */}
      <div
        role="group"
        aria-label="Filter by type of place"
        className="-mx-4 flex gap-2 overflow-x-auto px-4 py-1 sm:mx-0 sm:flex-wrap sm:px-px"
      >
        {filters.map((f) => {
          const on = f.id === kind;
          const count =
            f.id === "all"
              ? places.length
              : places.filter((p) => p.kind === f.id).length;
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={on}
              onClick={() => setKind(f.id)}
              className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                on
                  ? "bg-brand-navy text-white"
                  : "bg-white text-brand-navy/70 ring-1 ring-brand-navy/10"
              }`}
            >
              {f.label}
              <span
                className={`rounded-full px-1.5 text-xs ${on ? "bg-white/20" : "bg-brand-navy/5"}`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Gallery */}
      <ul key={kind} className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <li key={p.id} className="fade-up">
            <button
              type="button"
              onClick={() => setOpenId(p.id)}
              aria-haspopup="dialog"
              className="flex h-full w-full flex-col overflow-hidden rounded-3xl bg-white text-left shadow-sm ring-1 ring-black/5"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Visual place={p} />
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-brand-navy backdrop-blur">
                  {labelFor[p.kind]}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.15em] text-brand-teal">
                  <MapPin aria-hidden className="size-3.5" />
                  {p.area}
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold uppercase leading-tight tracking-wide text-brand-navy">
                  {p.name}
                </h3>
                <p className="mt-2 leading-relaxed text-neutral-600">
                  {p.teaser}
                </p>
                <p className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm text-neutral-500">
                  <Clock aria-hidden className="size-4 text-brand-orange" />
                  {p.era}
                </p>
              </div>
            </button>
          </li>
        ))}
      </ul>

      {/* Detail panel: slides in from the right on desktop, up from the bottom on phones. */}
      {open && (
        <div
          className="fixed inset-0 z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="place-title"
        >
          <button
            type="button"
            aria-label="Close"
            onClick={() => setOpenId(null)}
            className="overlay-in absolute inset-0 bg-brand-navy/50 backdrop-blur-sm"
          />
          <div
            // Let the panel scroll natively instead of the page's smooth-scroll (Lenis) taking over.
            data-lenis-prevent
            className="drawer-in absolute inset-x-0 bottom-0 max-h-[88svh] overflow-y-auto rounded-t-[2rem] bg-brand-sand shadow-2xl md:inset-y-0 md:left-auto md:right-0 md:max-h-none md:w-[32rem] md:rounded-l-[2rem] md:rounded-tr-none"
          >
            <div className="relative aspect-[16/10]">
              <Visual place={open} large />
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpenId(null)}
                aria-label="Close"
                className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-white/90 text-brand-navy shadow backdrop-blur"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="p-6 sm:p-8">
              <p className="inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-[0.15em] text-brand-teal">
                <MapPin aria-hidden className="size-4" />
                {open.area} · {labelFor[open.kind]}
              </p>
              <h3
                id="place-title"
                className="mt-2 font-display text-3xl font-bold uppercase leading-tight tracking-tight text-brand-navy sm:text-4xl"
              >
                {open.name}
              </h3>
              <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-neutral-500">
                <Clock aria-hidden className="size-4 text-brand-orange" />
                {open.era}
              </p>
              <p className="mt-5 text-lg leading-relaxed">{open.story}</p>

              <h4 className="mt-7 font-display text-sm font-semibold uppercase tracking-[0.25em] text-brand-teal">
                What to see
              </h4>
              <ul className="mt-3 space-y-2">
                {open.see.map((s) => (
                  <li key={s} className="flex gap-3">
                    <span
                      aria-hidden
                      className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand-orange"
                    />
                    {s}
                  </li>
                ))}
              </ul>

              <p className="mt-7 flex gap-3 rounded-2xl bg-white p-4 text-brand-navy shadow-sm ring-1 ring-black/5">
                <Lightbulb
                  aria-hidden
                  className="mt-0.5 size-5 shrink-0 text-brand-orange"
                />
                <span>
                  <strong>Visitor tip: </strong>
                  {open.tip}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
