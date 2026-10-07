import type { Beach } from "@/lib/beaches";

// One wave crest repeated across 800 units; it slides left by 400 in a loop (see .wave-* in globals.css).
const wave = (y: number, h: number) => {
  let d = `M0 ${y}`;
  for (let x = 0; x < 800; x += 100) {
    d += ` q25 ${-h} 50 0 t50 0`;
  }
  return `${d} V260 H0 Z`;
};

const INK = "#0a315e";

function Landmark({ scene }: { scene: Beach["scene"] }) {
  switch (scene) {
    case "lighthouse":
      return (
        <g fill={INK}>
          <path d="M282 196 300 120h14l18 76Z" opacity="0.9" />
          <path
            d="M296 136h22v8h-22zM292 160h30v8h-30z"
            fill="#fff"
            opacity="0.85"
          />
          <rect x="298" y="108" width="18" height="12" />
          <path d="M296 108h22l-11-10Z" />
          {/* Rotating beam */}
          <g className="beam" style={{ transformOrigin: "307px 114px" }}>
            <path d="M307 114 400 96v36Z" fill="#fff6c9" opacity="0.55" />
          </g>
          <path d="M250 200c20-14 70-18 110-8l20 10H240Z" opacity="0.75" />
        </g>
      );
    case "port":
      return (
        <g fill={INK} opacity="0.8">
          <g className="drift">
            <path d="M40 150h70l-8 10H48Z" />
            <rect x="60" y="138" width="26" height="12" />
            <rect x="66" y="130" width="6" height="8" />
          </g>
          <path d="M300 150v-44h4v44zM304 108h40v3h-40zM338 111v14h2v-14z" />
          <path d="M290 150h80l-6 8h-68Z" />
          <rect
            x="318"
            y="140"
            width="36"
            height="10"
            fill="#e5652a"
            opacity="0.7"
          />
        </g>
      );
    case "rocks":
      return (
        <g fill={INK}>
          <path
            d="M210 205c4-26 30-40 56-36 22 3 34 18 36 36Z"
            opacity="0.85"
          />
          <path d="M290 208c2-18 18-28 36-26 18 2 28 14 28 26Z" opacity="0.7" />
          <path d="M150 210c6-12 22-16 34-12 10 3 14 8 16 12Z" opacity="0.6" />
          <g opacity="0.75">
            <path d="M352 150h26v30h-26z" />
            <path d="M348 150 365 132l17 18Z" />
            <path d="M362 126v-8h6v8z" />
          </g>
          <g className="splash" fill="#fff" opacity="0.8">
            <circle cx="214" cy="180" r="5" />
            <circle cx="224" cy="172" r="3.5" />
            <circle cx="206" cy="170" r="2.5" />
          </g>
        </g>
      );
    case "palms":
      return <Palms />;
    case "boats":
      return (
        <g>
          {[
            { x: 60, c: "#e5652a" },
            { x: 150, c: "#3fa2c2" },
            { x: 250, c: "#f4b740" },
          ].map((b, i) => (
            <g
              key={b.x}
              className="bob"
              style={{ animationDelay: `${i * 0.6}s` }}
            >
              <path d={`M${b.x} 214h70l-10 14h-50Z`} fill={b.c} />
              <path d={`M${b.x + 34} 214v-34`} stroke={INK} strokeWidth="2.5" />
              <path
                d={`M${b.x + 36} 182l22 26h-22Z`}
                fill="#fff"
                opacity="0.9"
              />
            </g>
          ))}
        </g>
      );
    case "temple":
      return (
        <g fill={INK} opacity="0.8">
          <Palms small />
          <path d="M300 200v-34h50v34Z" />
          <path d="M296 166h58l-29-18Z" />
          <circle cx="325" cy="146" r="6" />
          <path d="M325 132v8" stroke={INK} strokeWidth="2" />
        </g>
      );
    case "surf":
      return (
        <g className="ride">
          <path
            d="M230 176c20-6 46-6 66 0l-6 5c-18-4-38-4-54 0Z"
            fill="#f4b740"
          />
          <g fill={INK}>
            <circle cx="262" cy="140" r="5" />
            <path d="M260 146c-6 8-8 16-6 24l4 1 3-12 6 14h4l-4-18 8 4 2-4-12-8Z" />
          </g>
        </g>
      );
  }
}

function Palms({ small = false }: { small?: boolean }) {
  const trees = small
    ? [{ x: 60, h: 1 }]
    : [
        { x: 50, h: 1 },
        { x: 96, h: 0.8 },
        { x: 330, h: 0.9 },
      ];
  return (
    <g fill={INK} opacity="0.85">
      {trees.map((t) => (
        <g
          key={t.x}
          className="sway"
          style={{ transformOrigin: `${t.x}px 220px` }}
        >
          <path
            d={`M${t.x} 220c2-30 6-60 16-${80 * t.h}l4 1c-9 20-12 48-14 79Z`}
          />
          <g transform={`translate(${t.x + 18} ${220 - 80 * t.h})`}>
            <path d="M0 0c-14-10-32-10-44-2 14-2 28 0 42 6ZM0 0c-4-14-16-24-30-24 10 6 18 14 26 26ZM0 0c6-12 18-20 32-20-10 6-18 12-28 22ZM0 0c14-6 30-4 40 6-12-3-26-3-38 0Z" />
          </g>
        </g>
      ))}
    </g>
  );
}

export function BeachScene({ beach }: { beach: Beach }) {
  const id = beach.id;
  return (
    <svg
      viewBox="0 0 400 260"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={`Illustration of ${beach.name}`}
      className="h-full w-full"
    >
      <defs>
        <linearGradient id={`sky-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={beach.sky[0]} />
          <stop offset="1" stopColor={beach.sky[1]} />
        </linearGradient>
        <radialGradient id={`glow-${id}`}>
          <stop offset="0" stopColor="#fff3c4" stopOpacity="0.95" />
          <stop offset="1" stopColor="#fff3c4" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="400" height="260" fill={`url(#sky-${id})`} />

      {/* Sun, slowly breathing, with its glow */}
      <g className="beach-sun">
        <circle cx="300" cy="78" r="70" fill={`url(#glow-${id})`} />
        <circle cx="300" cy="78" r="26" fill="#ffd166" />
      </g>

      {/* Birds */}
      <g
        className="birds"
        fill="none"
        stroke={INK}
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.6"
      >
        <path d="M90 60q6-6 12 0q6-6 12 0" />
        <path d="M122 46q4-4 8 0q4-4 8 0" />
      </g>

      {/* Sea */}
      <rect y="150" width="400" height="110" fill={beach.sea} />
      <rect y="150" width="400" height="3" fill="#fff" opacity="0.25" />

      <Landmark scene={beach.scene} />

      {/* Waves in three layers, each sliding at its own speed */}
      <path
        className="wave wave-a"
        d={wave(176, 6)}
        fill="#fff"
        opacity="0.18"
      />
      <path
        className="wave wave-b"
        d={wave(192, 8)}
        fill={beach.sea}
        opacity="0.9"
      />
      <path
        className="wave wave-c"
        d={wave(206, 7)}
        fill="#fff"
        opacity="0.35"
      />

      {/* Sand */}
      <path d="M0 226c80-12 180-14 260-6s110 6 140 2V260H0Z" fill="#f3dcb2" />
      <path
        d="M0 236c90-8 200-8 290-2s90 4 110 2V260H0Z"
        fill="#ead0a0"
        opacity="0.7"
      />
    </svg>
  );
}
