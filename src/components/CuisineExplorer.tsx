"use client";

import {
  Drumstick,
  Fish,
  Flame,
  IceCreamCone,
  Leaf,
  Lightbulb,
  type LucideIcon,
  Sunrise,
  X,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { type CourseId, courses, type Dish, dishes } from "@/lib/cuisine";

const iconFor: Record<CourseId, LucideIcon> = {
  seafood: Fish,
  meat: Drumstick,
  veg: Leaf,
  breakfast: Sunrise,
  sweet: IceCreamCone,
};

const labelFor = Object.fromEntries(courses.map((c) => [c.id, c.label]));
const spiceLabel = ["Mild", "Medium", "Spicy", "Fiery"];

function Spice({ level }: { level: Dish["spice"] }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 text-sm text-neutral-500"
      title={spiceLabel[level]}
    >
      <span className="flex" aria-hidden>
        {[1, 2, 3].map((i) => (
          <Flame
            key={i}
            className={`size-4 ${i <= level ? "text-brand-orange" : "text-neutral-300"}`}
          />
        ))}
      </span>
      {spiceLabel[level]}
    </span>
  );
}

function VegMark({ veg }: { veg: boolean }) {
  // The familiar Indian veg / non-veg symbol: a dot in a square, green or red.
  return (
    <span
      title={veg ? "Vegetarian" : "Non-vegetarian"}
      className={`grid size-4 place-items-center rounded-[3px] border-2 bg-white ${
        veg ? "border-green-600" : "border-red-700"
      }`}
    >
      <span
        className={`size-1.5 rounded-full ${veg ? "bg-green-600" : "bg-red-700"}`}
      />
      <span className="sr-only">{veg ? "Vegetarian" : "Non-vegetarian"}</span>
    </span>
  );
}

function Visual({ dish, large = false }: { dish: Dish; large?: boolean }) {
  const Icon = iconFor[dish.course];
  if (dish.image) {
    return (
      <Image
        src={dish.image}
        alt={dish.imageAlt ?? dish.name}
        fill
        placeholder="blur"
        sizes={
          large
            ? "(min-width: 768px) 32rem, 100vw"
            : "(min-width: 1024px) 22rem, (min-width: 640px) 50vw, 100vw"
        }
        className="object-cover"
      />
    );
  }
  return (
    <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_30%_20%,#fde7c7_0%,#f7b98a_50%,#c2410c_150%)]">
      <div className="absolute inset-0 opacity-[0.12] [background-image:radial-gradient(#0a315e_1px,transparent_1.5px)] [background-size:14px_14px]" />
      <Icon
        strokeWidth={1.1}
        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-brand-navy/70 ${
          large ? "size-28" : "size-16"
        }`}
      />
    </div>
  );
}

/** Filterable menu of Mangalorean dishes; tapping a dish opens a detail panel. */
export function CuisineExplorer() {
  const [course, setCourse] = useState<CourseId | "all">("all");
  const [vegOnly, setVegOnly] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const list = dishes.filter(
    (d) => (course === "all" || d.course === course) && (!vegOnly || d.veg),
  );
  const open = dishes.find((d) => d.id === openId) ?? null;

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

  const filters = [{ id: "all" as const, label: "All" }, ...courses];
  const countFor = (id: CourseId | "all") =>
    dishes.filter(
      (d) => (id === "all" || d.course === id) && (!vegOnly || d.veg),
    ).length;

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Course filters */}
        <div
          role="group"
          aria-label="Filter dishes by course"
          className="-mx-4 flex gap-2 overflow-x-auto px-4 py-1 sm:mx-0 sm:flex-wrap sm:px-px"
        >
          {filters.map((f) => {
            const on = f.id === course;
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={on}
                onClick={() => setCourse(f.id)}
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
                  {countFor(f.id)}
                </span>
              </button>
            );
          })}
        </div>

        {/* Veg-only switch */}
        <button
          type="button"
          role="switch"
          aria-checked={vegOnly}
          onClick={() => setVegOnly((v) => !v)}
          className="inline-flex shrink-0 items-center gap-3 self-start rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-navy ring-1 ring-brand-navy/10 sm:self-auto"
        >
          <span
            className={`relative h-5 w-9 rounded-full transition-colors ${vegOnly ? "bg-green-600" : "bg-neutral-300"}`}
          >
            <span
              className={`absolute top-0.5 size-4 rounded-full bg-white shadow transition-transform ${
                vegOnly ? "translate-x-4.5" : "translate-x-0.5"
              }`}
            />
          </span>
          Veg only
        </button>
      </div>

      {/* Menu */}
      {list.length === 0 ? (
        <p className="mt-10 rounded-2xl bg-white p-6 text-center text-neutral-500 ring-1 ring-black/5">
          No vegetarian dishes in this course. Turn off &quot;Veg only&quot; to
          see them all.
        </p>
      ) : (
        <ul
          key={`${course}-${vegOnly}`}
          className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {list.map((d) => (
            <li key={d.id} className="fade-up">
              <button
                type="button"
                onClick={() => setOpenId(d.id)}
                aria-haspopup="dialog"
                className="flex h-full w-full flex-col overflow-hidden rounded-3xl bg-white text-left shadow-sm ring-1 ring-black/5"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Visual dish={d} />
                  <span className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-brand-navy backdrop-blur">
                    <VegMark veg={d.veg} />
                    {labelFor[d.course]}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-xl font-semibold uppercase leading-tight tracking-wide text-brand-navy">
                    {d.name}
                  </h3>
                  <p className="mt-2 leading-relaxed text-neutral-600">
                    {d.teaser}
                  </p>
                  <div className="mt-auto pt-4">
                    <Spice level={d.spice} />
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Detail panel: slides in from the right on desktop, up from the bottom on phones. */}
      {open && (
        <div
          className="fixed inset-0 z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="dish-title"
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
              <Visual dish={open} large />
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
              <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.15em] text-brand-teal">
                <VegMark veg={open.veg} />
                {labelFor[open.course]}
              </p>
              <h3
                id="dish-title"
                className="mt-2 font-display text-3xl font-bold uppercase leading-tight tracking-tight text-brand-navy sm:text-4xl"
              >
                {open.name}
              </h3>
              {open.localName && (
                <p className="mt-1 font-script text-2xl text-brand-orange">
                  {open.localName}
                </p>
              )}
              <div className="mt-3">
                <Spice level={open.spice} />
              </div>
              <p className="mt-5 text-lg leading-relaxed">{open.description}</p>

              <p className="mt-7 flex gap-3 rounded-2xl bg-white p-4 text-brand-navy shadow-sm ring-1 ring-black/5">
                <Lightbulb
                  aria-hidden
                  className="mt-0.5 size-5 shrink-0 text-brand-orange"
                />
                <span>
                  <strong>Best with: </strong>
                  {open.pairWith}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
