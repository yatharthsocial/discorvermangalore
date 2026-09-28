import Image from "next/image";
import Link from "next/link";
import heroImage from "@/assets/herosectionlap.jpg";
import towerCutout from "@/assets/clocktower-cutout.png";
import wordmark from "@/assets/mangaluru-wordmark.png";
import logo from "@/assets/dm-logo.png";
import { site } from "@/lib/site";

// The photo, wordmark and tower cut-out share one "stage" sized like `object-cover` (anchored 50% / 75%),
// so everything inside can be positioned in % of the photo and stays aligned at every screen size.
const stageStyle = {
  width: `max(100%, calc(max(100svh, 560px) * ${heroImage.width} / ${heroImage.height}))`,
  aspectRatio: `${heroImage.width} / ${heroImage.height}`,
};

// Where clocktower-cutout.png was cropped from the photo, in % of the photo.
const towerBox = { left: "43.9153%", top: "37.0501%", width: "12.1693%" };

export function Hero() {
  return (
    <section className="relative h-svh min-h-[560px] overflow-hidden">
      {/* Visually hidden, but keeps a single H1 on the home page for SEO. */}
      <h1 className="sr-only">{site.title}</h1>

      <div className="absolute left-1/2 top-3/4 -translate-x-1/2 -translate-y-3/4" style={stageStyle}>
        <Image
          src={heroImage}
          alt="Red-brick clock tower at a busy town circle in Mangaluru under a bright blue sky"
          fill
          preload
          placeholder="blur"
          sizes={`(max-aspect-ratio: ${heroImage.width}/${heroImage.height}) 134vh, 100vw`}
          className="object-cover"
        />

        <div className="absolute left-1/2 top-[34%] w-[min(88%,92vw)] -translate-x-1/2 -translate-y-1/2">
          <Image src={wordmark} alt="Mangaluru" preload sizes="92vw" className="hero-rise h-auto w-full" />
        </div>

        {/* The tower sits in front of the wordmark, so the letters rise up from behind it. */}
        <Image
          src={towerCutout}
          alt=""
          preload
          sizes="(max-aspect-ratio: 4/3) 17vh, 13vw"
          className="pointer-events-none absolute h-auto"
          style={towerBox}
        />
      </div>

      <Link
        href="/"
        aria-label="Discover Mangaluru home"
        className="hero-fade absolute left-3 top-3 z-10 sm:left-4 sm:top-4 lg:left-6 lg:top-5"
      >
        <Image src={logo} alt="Discover Mangaluru" preload sizes="140px" className="h-6 w-auto drop-shadow-[0_1px_6px_rgba(255,255,255,0.35)] sm:h-7 lg:h-8" />
      </Link>
    </section>
  );
}
