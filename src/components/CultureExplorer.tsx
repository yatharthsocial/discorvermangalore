"use client";

import {
  CalendarDays,
  Drama,
  Flame,
  Flower2,
  Lightbulb,
  type LucideIcon,
  PawPrint,
  Sparkles,
  TreePine,
  X,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { type KindId, kinds, type Tradition, traditions } from "@/lib/culture";

// Shown on the tile until a tradition has its own photo.
const iconFor: Record<string, LucideIcon> = {
  "pili-vesha": PawPrint,
  "christmas-milagres": TreePine,
  "monti-fest": Flower2,
};
const kindIcon: Record<KindId, LucideIcon> = {
  performing: Drama,
  ritual: Flame,
  festival: Sparkles,
  sport: CalendarDays,
};

const labelFor = Object.fromEntries(kinds.map((k) => [k.id, k.label]));

function Visual({ t, large = false }: { t: Tradition; large?: boolean }) {
  if (t.image) {
    return (
      <Image
        src={t.image}
        alt={t.imageAlt ?? t.name}
        fill
        placeholder="blur"
        sizes={
          large
            ? "(min-width: 768px) 32rem, 100vw"
            : "(min-width: 1024px) 22rem, (min-width: 640px) 50vw, 100vw"
        }
        className="object-cover"
        style={{ objectPosition: t.imagePosition }}
      />
    );
  }
  const Icon = iconFor[t.id] ?? kindIcon[t.kind];
  return (
    <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_30%_20%,#fbe3cf_0%,#f6c9a6_45%,#e5652a_140%)]">
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

/** Filterable grid of traditions; tapping one opens a detail panel. */
export function CultureExplorer() {
  const [kind, setKind] = useState<KindId | "all">("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const list =
    kind === "all" ? traditions : traditions.filter((t) => t.kind === kind);
  const open = traditions.find((t) => t.id === openId) ?? null;

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
      <div
        role="group"
        aria-label="Filter traditions by type"
        className="-mx-4 flex gap-2 overflow-x-auto px-4 py-1 sm:mx-0 sm:flex-wrap sm:px-px"
      >
        {filters.map((f) => {
          const on = f.id === kind;
          const count =
            f.id === "all"
              ? traditions.length
              : traditions.filter((t) => t.kind === f.id).length;
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

      <ul key={kind} className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((t) => (
          <li key={t.id} className="fade-up">
            <button
              type="button"
              onClick={() => setOpenId(t.id)}
              aria-haspopup="dialog"
              className="flex h-full w-full flex-col overflow-hidden rounded-3xl bg-white text-left shadow-sm ring-1 ring-black/5"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Visual t={t} />
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-brand-navy backdrop-blur">
                  {labelFor[t.kind]}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-xl font-semibold uppercase leading-tight tracking-wide text-brand-navy">
                  {t.name}
                </h3>
                <p className="mt-2 leading-relaxed text-neutral-600">
                  {t.teaser}
                </p>
                <p className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm text-neutral-500">
                  <CalendarDays
                    aria-hidden
                    className="size-4 text-brand-orange"
                  />
                  {t.season}
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
          aria-labelledby="tradition-title"
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
            <div className="relative aspect-[16/11]">
              <Visual t={open} large />
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
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-brand-teal">
                {labelFor[open.kind]}
              </p>
              <h3
                id="tradition-title"
                className="mt-2 font-display text-3xl font-bold uppercase leading-tight tracking-tight text-brand-navy sm:text-4xl"
              >
                {open.name}
              </h3>
              <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-neutral-500">
                <CalendarDays
                  aria-hidden
                  className="size-4 text-brand-orange"
                />
                {open.season}
              </p>
              <p className="mt-5 text-lg leading-relaxed">{open.story}</p>

              <h4 className="mt-7 font-display text-sm font-semibold uppercase tracking-[0.25em] text-brand-teal">
                What you&apos;ll experience
              </h4>
              <ul className="mt-3 space-y-2">
                {open.experience.map((s) => (
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
