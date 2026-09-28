"use client";

import Lenis from "lenis";
import { useEffect } from "react";

// One smooth-scroll instance for the whole page. Without it a mouse wheel moves the page in
// hard 100px steps, and the scroll-linked About cards inherit that stepping.
export function SmoothScroll() {
  useEffect(() => {
    // Visitors who prefer reduced motion keep normal browser scrolling.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1, // lower = smoother / floatier
      anchors: true, // in-page links (#about, ...) glide to their section
    });

    return () => lenis.destroy();
  }, []);

  return null;
}
