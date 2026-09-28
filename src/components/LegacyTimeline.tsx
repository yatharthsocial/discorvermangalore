"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

type Milestone = { year: string; title: string; text: string };
type LineBox = {
  left: number;
  top: number;
  width: number;
  height: number;
  horizontal: boolean;
};

const clamp = (n: number) => Math.min(1, Math.max(0, n));

/**
 * "Built here" timeline. As you scroll, an orange line fills from one year to the next and each year lights up
 * when the line reaches it. Desktop: the section heading and timeline stick in place together while you scroll
 * through all the years, then the page carries on. Mobile: it runs vertically and each year lights up as it
 * passes the middle of the screen.
 */
export function LegacyTimeline({
  milestones,
  header,
}: {
  milestones: Milestone[];
  header: ReactNode;
}) {
  const pinRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const pinTopRef = useRef(0);
  const [pinTop, setPinTop] = useState(0);
  const [lit, setLit] = useState(1);
  const [fill, setFill] = useState(0);
  const [line, setLine] = useState<LineBox | null>(null);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    let frame = 0;
    // Set on cleanup, so late callbacks (fonts loading, a queued frame) do nothing once the timeline is gone.
    let disposed = false;

    // Centres of the dots, or null if any dot isn't on the page (e.g. while navigating away).
    const dotCenters = () => {
      const dots = dotRefs.current.slice(0, milestones.length);
      if (dots.length < milestones.length || dots.some((d) => !d)) return null;
      return dots.map((dot) => {
        const r = dot!.getBoundingClientRect();
        return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
      });
    };

    // Run the line exactly from the first dot's centre to the last one's, whatever the layout.
    const measure = () => {
      const track = trackRef.current;
      const sticky = stickyRef.current;
      const pts = dotCenters();
      if (disposed || !track || !sticky || !pts) return;

      // Where the block sticks: centred on screen if it fits, otherwise with its bottom at the bottom of the
      // screen so the timeline is never cut off.
      const blockHeight = sticky.offsetHeight;
      const top = !desktop.matches
        ? 0
        : blockHeight <= window.innerHeight
          ? (window.innerHeight - blockHeight) / 2
          : window.innerHeight - blockHeight;
      pinTopRef.current = top;
      setPinTop(top);

      const box = track.getBoundingClientRect();
      const first = pts[0];
      const last = pts[pts.length - 1];
      setLine(
        desktop.matches
          ? {
              left: first.x - box.left,
              top: first.y - box.top - 1,
              width: last.x - first.x,
              height: 2,
              horizontal: true,
            }
          : {
              left: first.x - box.left - 1,
              top: first.y - box.top,
              width: 2,
              height: last.y - first.y,
              horizontal: false,
            },
      );
    };

    const update = () => {
      frame = 0;
      if (disposed) return;
      const count = milestones.length;
      let progress: number;
      let reached: number;

      if (desktop.matches && pinRef.current && stickyRef.current) {
        // How far through the pinned stretch we are: 0 when the timeline first pins, 1 when it lets go.
        const r = pinRef.current.getBoundingClientRect();
        const range = r.height - stickyRef.current.offsetHeight;
        const p = range > 0 ? (pinTopRef.current - r.top) / range : 1;
        progress = clamp(p / 0.85); // finish a little early so the last year holds for a moment
        reached = Math.floor(progress * (count - 1) + 0.001) + 1;
      } else {
        const pts = dotCenters();
        if (!pts) return;
        const mark = window.innerHeight * 0.55;
        const first = pts[0].y;
        const last = pts[count - 1].y;
        progress = clamp((mark - first) / (last - first));
        reached = pts.filter((pt) => pt.y <= mark).length;
      }

      setFill(progress);
      setLit(reached);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      onScroll();
    };

    onResize();
    document.fonts?.ready.then(onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    desktop.addEventListener("change", onResize);
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      desktop.removeEventListener("change", onResize);
    };
  }, [milestones]);

  return (
    // Desktop: heading + timeline stick together (at `pinTop`, worked out in measure()). The spacer at the end is
    // the scroll distance they stay stuck for while the years light up (padding wouldn't work: a sticky element
    // can only travel within its parent's content, not its padding).
    <div ref={pinRef}>
      <div ref={stickyRef} className="lg:sticky" style={{ top: pinTop }}>
        {header}

        <h3 className="mt-16 text-center font-display text-sm font-semibold uppercase tracking-[0.3em] text-brand-teal lg:mt-14">
          Built here
        </h3>

        <div ref={trackRef} className="relative mt-12 lg:mt-10">
          {line && (
            <div
              aria-hidden
              className="absolute overflow-hidden rounded-full bg-white/10"
              style={{
                left: line.left,
                top: line.top,
                width: line.width,
                height: line.height,
              }}
            >
              <div
                className={`h-full w-full rounded-full bg-brand-orange transition-transform duration-200 ease-out ${
                  line.horizontal ? "origin-left" : "origin-top"
                }`}
                style={{
                  transform: line.horizontal
                    ? `scaleX(${fill})`
                    : `scaleY(${fill})`,
                }}
              />
            </div>
          )}

          <ol className="relative flex flex-col gap-12 lg:grid lg:grid-cols-5 lg:gap-8">
            {milestones.map((m, i) => {
              const isLit = i < lit;
              const isCurrent = i === lit - 1;
              return (
                <li
                  key={m.year}
                  className="relative pl-14 lg:flex lg:flex-col lg:items-center lg:pl-0 lg:text-center"
                >
                  <span
                    ref={(el) => {
                      dotRefs.current[i] = el;
                    }}
                    aria-hidden
                    className={`absolute left-0 top-0 grid size-9 place-items-center rounded-full border-2 bg-brand-navy transition-[border-color,box-shadow] duration-500 lg:static ${
                      isLit ? "border-brand-orange" : "border-white/25"
                    } ${isCurrent ? "shadow-[0_0_0_7px_rgb(229_101_42/0.18)]" : ""}`}
                  >
                    <span
                      className={`size-4 rounded-full bg-brand-orange transition-transform duration-500 ease-out ${
                        isLit ? "scale-100" : "scale-0"
                      }`}
                    />
                  </span>
                  <p
                    className={`origin-left font-display text-5xl font-bold leading-none transition-[color,transform] duration-500 lg:mt-6 lg:origin-center ${
                      isCurrent
                        ? "scale-105 text-brand-orange"
                        : isLit
                          ? "text-white"
                          : "text-white/25"
                    }`}
                  >
                    {m.year}
                  </p>
                  <p
                    className={`mt-3 font-display text-lg font-semibold uppercase tracking-wide transition-colors duration-500 ${
                      isLit ? "text-brand-orange" : "text-white/35"
                    }`}
                  >
                    {m.title}
                  </p>
                  <p
                    className={`mt-2 text-balance text-[0.95rem] leading-relaxed transition-colors duration-500 lg:min-h-[4.7rem] lg:max-w-[15rem] ${
                      isLit ? "text-white/75" : "text-white/35"
                    }`}
                  >
                    {m.text}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
      <div aria-hidden className="hidden h-[120vh] lg:block" />
    </div>
  );
}
