import type { CSSProperties } from "react";
import { site } from "@/lib/content";
import { Art, Tape } from "@/components/ui/Art";
import { Arrow, Badge, Star } from "@/components/ui/Arrow";

type V = CSSProperties & Record<`--${string}`, string>;

/** Delay relative to the end of the loader (see --intro in globals.css). */
const at = (s: number) => `calc(var(--intro) + ${s}s)`;
const fade = "opacity-0 [animation:fadeUp_.8s_var(--ease-out-expo)_forwards]";

const layers = [
  { depth: 1.4, pos: { left: "3%", top: 220, width: 240, height: 310 }, r: "-9deg", delay: 0.45, tape: "yellow", art: { art: "sun", bg: "#FF7A1A", fg: "#FFD23F" } },
  { depth: 0.8, pos: { right: "4%", top: 180, width: 260, height: 260 }, r: "8deg", delay: 0.55, tape: "pink", art: { art: "riso", bg: "#F4F1EA", fg: "#FF5BA7", c2: "#4D6BFF" } },
  { depth: 2, pos: { left: "11%", top: 640, width: 200, height: 250 }, r: "6deg", delay: 0.65, tape: "lime", art: { art: "letter", bg: "#4D6BFF", fg: "#C8FF2E", glyph: "g" }, glyphSize: 230 },
  { depth: 1.6, pos: { right: "9%", top: 600, width: 230, height: 290 }, r: "-6deg", delay: 0.75, tape: "yellow", art: { art: "op", bg: "#FFD23F", fg: "#0E0E13", c2: "#FF5BA7" } },
] as const;

/** Per-letter drift on scroll (initMotion, [data-scatter]); cycles if the name is longer. */
const SCATTER = [0.06, -0.14, 0.1, -0.07, 0.12, -0.08, 0.15, -0.11, 0.07];

function NameLines({ delays, accent }: { delays: [number, number]; accent?: boolean }) {
  let n = 0;
  return site.nameLines.map((line, li) => (
    <span key={line} className="-mt-[.1em] block overflow-hidden pb-[.02em] pt-[.16em]">
      <span
        className="inline-block [transform:translateY(105%)_rotate(4deg)] [animation:up_1s_var(--ease-out-expo)_forwards]"
        style={{ animationDelay: at(delays[li]) }}
      >
        {[...line].map((ch, ci) => (
          <span
            key={ci}
            data-scatter={SCATTER[n++ % SCATTER.length]}
            className={`inline-block will-change-transform ${accent && li === 0 && ci === 1 ? "text-lime" : ""}`}
          >
            {ch}
          </span>
        ))}
      </span>
    </span>
  ));
}

const name = "disp text-[clamp(110px,21vw,320px)]";

export function Hero() {
  return (
    <section id="top" className="wrap relative min-h-[1080px] pb-20 pt-[150px] text-center max-md:min-h-0 max-md:pt-[120px]">
      {/* Dot grid, faded out towards the edges */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(244,241,234,.16)_1.2px,transparent_1.6px)] bg-[length:28px_28px] [mask-image:radial-gradient(ellipse_60%_55%_at_50%_45%,#000_30%,transparent_80%)]"
      />

      <span
        className={`relative z-[4] inline-flex items-center gap-2.5 rounded-full border border-cream/20 bg-ink/60 px-4 py-2 text-[15px] font-semibold ${fade}`}
        style={{ animationDelay: at(0.15) }}
      >
        <i className="inline-block size-2.5 rounded-full bg-lime [animation:pulse_2s_ease-in-out_infinite]" />
        {site.availability}
      </span>
      <br />

      {/* Name + two misregistered riso "ghost" prints (mouse parallax via data-depth) */}
      <div className="relative z-[3] mt-[22px] inline-block">
        <div className="pointer-events-none absolute inset-0" data-depth="0.5" aria-hidden="true">
          <div className={`${name} relative left-[.035em] top-[.028em] text-pink mix-blend-screen`}>
            <NameLines delays={[0.27, 0.39]} />
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0" data-depth="-0.4" aria-hidden="true">
          <div className={`${name} relative -left-[.03em] -top-[.018em] text-blue mix-blend-screen`}>
            <NameLines delays={[0.21, 0.33]} />
          </div>
        </div>
        <h1 className={`${name} relative`} aria-label={site.name}>
          <NameLines delays={[0.25, 0.37]} accent />
        </h1>
      </div>

      {/* Cut-out collage taped to the wall */}
      {layers.map((l, i) => (
        <div key={i} data-depth={l.depth} className="absolute z-[2] max-md:hidden" style={l.pos}>
          <div
            className="relative size-full opacity-0 [animation:flyIn_1.1s_var(--ease-bounce)_forwards]"
            style={{ "--r": l.r, animationDelay: at(l.delay) } as V}
          >
            <Tape color={l.tape} />
            <div className="size-full overflow-hidden rounded-md shadow-[0_30px_50px_-18px_rgba(0,0,0,.75),0_0_0_6px_#F4F1EA]">
              <Art {...l.art} glyphSize={"glyphSize" in l ? l.glyphSize : undefined} />
            </div>
          </div>
        </div>
      ))}

      <div className={`note ${fade}`} style={{ left: "6%", top: 548, rotate: "-6deg", animationDelay: at(1.15) }}>
        {site.notes[0]}
      </div>
      <div className={`note ${fade}`} style={{ right: "5%", top: 900, rotate: "4deg", animationDelay: at(1.25) }}>
        {site.notes[1]}
      </div>
      <div
        className="sticker size-[118px] rounded-full bg-pink text-[38px] opacity-0 [animation:stick_.6s_var(--ease-bounce)_forwards] max-md:hidden"
        style={{ "--r": "-12deg", left: "21%", top: 175, animationDelay: at(0.95) } as V}
      >
        {site.stickers[0]}
      </div>
      <div
        className="sticker rounded-[14px] bg-yellow px-5 py-2.5 text-[34px] opacity-0 [animation:stick_.6s_var(--ease-bounce)_forwards] max-md:hidden"
        style={{ "--r": "9deg", right: "23%", top: 480, animationDelay: at(1.05) } as V}
      >
        {site.stickers[1]}
      </div>

      <Badge
        id="ringHero"
        text={site.heroBadge}
        ring="#FF5BA7"
        ink="#0E0E13"
        core="#0E0E13"
        className={fade}
        style={{ left: "calc(50% + 250px)", top: 870, animationDelay: at(1.15) }}
      >
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#C8FF2E" strokeWidth="2.6" strokeLinecap="round">
          <path d="M12 4v16M5 13l7 7 7-7" />
        </svg>
      </Badge>

      <div className="float" data-speed="0.3" style={{ left: "47%", top: 120 }}>
        <Star size={58} fill="#C8FF2E" />
      </div>
      <div className="float spin" data-speed="-0.25" style={{ right: "2%", top: 960 }}>
        <svg width="120" height="120" viewBox="0 0 120 120" aria-hidden="true">
          <path d="M60 6 C 74 30, 90 30, 114 26 C 96 46, 96 66, 114 92 C 88 88, 74 92, 60 114 C 46 92, 32 88, 6 92 C 24 66, 24 46, 6 26 C 30 30, 46 30, 60 6 Z" fill="#FF5BA7" />
        </svg>
      </div>
      <div className="float" data-speed="0.2" style={{ left: "2%", top: 960 }}>
        <svg width="150" height="60" viewBox="0 0 150 60" aria-hidden="true">
          <path d="M4 34 Q 20 6, 36 34 T 68 34 T 100 34 T 146 30" fill="none" stroke="#4D6BFF" strokeWidth="8" strokeLinecap="round" />
        </svg>
      </div>
      <div className="float" data-speed="-0.15" style={{ left: "30%", top: 120 }}>
        <svg width="60" height="60" viewBox="0 0 60 60" aria-hidden="true">
          <circle cx="30" cy="30" r="24" fill="none" stroke="#FFD23F" strokeWidth="6" />
          <circle cx="30" cy="30" r="8" fill="#FFD23F" />
        </svg>
      </div>

      <p
        className={`relative z-[4] mx-auto mt-9 max-w-[740px] text-[30px] font-medium leading-[1.2] tracking-[-.015em] max-md:text-[22px] ${fade}`}
        style={{ animationDelay: at(0.55) }}
      >
        {site.positioning.before}{" "}
        <span className="relative inline-block">
          <span className="ser text-[1.15em] text-lime">{site.positioning.highlight}</span>
          <svg className="absolute -left-[6%] -bottom-[.32em] h-[.6em] w-[112%] overflow-visible" viewBox="0 0 200 20" preserveAspectRatio="none" aria-hidden="true">
            <path
              className="dr auto"
              style={{ "--len": "260", animationDelay: at(1.15) } as V}
              d="M3 12 C 50 2, 120 20, 197 6"
              fill="none"
              stroke="#FF5BA7"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </svg>
        </span>
        {site.positioning.after}
        <br />
        <span className="text-[19px] text-mute">{site.positioning.sub}</span>
      </p>

      <div className={`relative z-[4] mt-9 flex flex-wrap justify-center gap-3.5 ${fade}`} style={{ animationDelay: at(0.7) }}>
        <a href="#works" className="btn btn-lime" data-magnetic>
          Xem dự án <Arrow />
        </a>
        <a href="#contact" className="btn btn-line" data-magnetic>
          Liên hệ
        </a>
      </div>
    </section>
  );
}
