import type { CSSProperties } from "react";
import { site } from "@/lib/content";
import { Art } from "@/components/ui/Art";
import { Arrow, Star } from "@/components/ui/Arrow";

type V = CSSProperties & Record<`--${string}`, string>;

const fade = "opacity-0 [animation:fadeUp_.8s_var(--ease-out-expo)_forwards]";

const layers = [
  { depth: 1.4, pos: { left: "4%", top: 230, width: 250, height: 320 }, r: "-9deg", delay: "calc(var(--intro) + 0.4s)", art: { art: "sun", bg: "#FF7A1A", fg: "#FFD23F" } },
  { depth: 0.8, pos: { right: "5%", top: 190, width: 270, height: 270 }, r: "8deg", delay: "calc(var(--intro) + 0.5s)", art: { art: "flower", bg: "#4D6BFF", fg: "#FF5BA7" } },
  { depth: 2, pos: { left: "13%", top: 610, width: 200, height: 200 }, r: "6deg", delay: "calc(var(--intro) + 0.6s)", art: { art: "letter", bg: "#C8FF2E", fg: "#0E0E13", glyph: "G" }, glyphSize: 200 },
  { depth: 1.6, pos: { right: "10%", top: 560, width: 230, height: 290 }, r: "-5deg", delay: "calc(var(--intro) + 0.7s)", art: { art: "blob", bg: "#FFD23F", fg: "#0E0E13" } },
] as const;

export function Hero() {
  const [l1, l2] = site.nameLines;
  return (
    <section id="top" className="wrap relative min-h-[980px] pb-[60px] pt-[150px] text-center max-md:min-h-0 max-md:pt-[120px]">
      <span
        className={`inline-flex items-center gap-2.5 rounded-full border border-cream/20 px-4 py-2 text-[15px] font-semibold ${fade}`}
        style={{ animationDelay: "calc(var(--intro) + 0.1s)" }}
      >
        <i className="inline-block size-2.5 rounded-full bg-lime shadow-[0_0_0_4px_rgba(200,255,46,.2)]" />
        {site.availability}
      </span>

      <h1 className="disp relative z-[3] mt-7 text-[clamp(110px,22vw,330px)]" aria-label={site.name}>
        {[l1, l2].map((line, i) => (
          <span key={line} className="-mt-[.1em] block overflow-hidden pb-[.02em] pt-[.16em]">
            <span
              className="inline-block [transform:translateY(105%)_rotate(4deg)] [animation:up_.9s_var(--ease-out-expo)_forwards]"
              style={{ animationDelay: i === 0 ? "calc(var(--intro) + 0.15s)" : "calc(var(--intro) + 0.27s)" }}
            >
              {i === 0 ? (
                <>
                  {line[0]}
                  <span className="text-lime">{line[1]}</span>
                  {line.slice(2)}
                </>
              ) : (
                line
              )}
            </span>
          </span>
        ))}
      </h1>

      {/* Collage — mouse parallax via data-depth (Motion.tsx) */}
      {layers.map((l, i) => (
        <div key={i} data-depth={l.depth} className="absolute z-[2] max-md:hidden" style={l.pos}>
          <div
            className="size-full overflow-hidden rounded-3xl opacity-0 shadow-[0_30px_60px_-20px_rgba(0,0,0,.6)] [animation:flyIn_1s_var(--ease-bounce)_forwards]"
            style={{ "--r": l.r, animationDelay: l.delay } as V}
          >
            <Art {...l.art} glyphSize={"glyphSize" in l ? l.glyphSize : undefined} />
          </div>
        </div>
      ))}

      <div
        className="sticker size-[120px] rounded-full bg-pink text-[40px] opacity-0 [animation:stick_.6s_var(--ease-bounce)_forwards] max-md:hidden"
        style={{ "--r": "-12deg", left: "22%", top: 190, animationDelay: "calc(var(--intro) + 0.9s)" } as V}
      >
        {site.stickers[0]}
      </div>
      <div
        className="sticker rounded-[14px] bg-yellow px-5 py-2.5 text-[34px] opacity-0 [animation:stick_.6s_var(--ease-bounce)_forwards] max-md:hidden"
        style={{ "--r": "10deg", right: "22%", top: 470, animationDelay: "calc(var(--intro) + 1.0s)" } as V}
      >
        {site.stickers[1]}
      </div>

      <div className="float" data-speed="0.3" style={{ left: "46%", top: 140 }}>
        <Star size={64} fill="#C8FF2E" />
      </div>
      <div className="float spin" data-speed="-0.25" style={{ right: "3%", top: 880 }}>
        <svg width="120" height="120" viewBox="0 0 120 120" aria-hidden="true">
          <path d="M60 6 C 74 30, 90 30, 114 26 C 96 46, 96 66, 114 92 C 88 88, 74 92, 60 114 C 46 92, 32 88, 6 92 C 24 66, 24 46, 6 26 C 30 30, 46 30, 60 6 Z" fill="#FF5BA7" />
        </svg>
      </div>
      <div className="float" data-speed="0.2" style={{ left: "3%", top: 880 }}>
        <svg width="140" height="50" viewBox="0 0 140 50" aria-hidden="true">
          <path d="M4 30 Q 20 6, 36 30 T 68 30 T 100 30 T 136 26" fill="none" stroke="#4D6BFF" strokeWidth="7" strokeLinecap="round" />
        </svg>
      </div>

      <p
        className={`relative z-[3] mx-auto mt-10 max-w-[720px] text-[30px] font-medium leading-[1.2] tracking-[-.015em] max-md:text-[22px] ${fade}`}
        style={{ animationDelay: "calc(var(--intro) + 0.5s)" }}
      >
        {site.positioning.before}{" "}
        <mark className="inline-block -rotate-2 rounded-[.2em] bg-pink px-[.2em] text-ink">{site.positioning.highlight}</mark>
        {site.positioning.after}
        <br />
        <span className="text-[19px] text-mute">{site.positioning.sub}</span>
      </p>

      <div className={`relative z-[4] mt-9 flex flex-wrap justify-center gap-3.5 ${fade}`} style={{ animationDelay: "calc(var(--intro) + 0.65s)" }}>
        <a href="#works" className="btn btn-lime" data-magnetic>
          Xem dự án <Arrow />
        </a>
        <a href="#contact" className="btn btn-line" data-magnetic>
          Liên hệ
        </a>
      </div>

      <svg
        className={`absolute bottom-[70px] left-[calc(50%+230px)] max-md:hidden ${fade}`}
        style={{ animationDelay: "calc(var(--intro) + 0.95s)" }}
        width="130"
        height="90"
        viewBox="0 0 130 90"
        aria-hidden="true"
      >
        <path d="M120 10 C 90 6, 60 30, 50 60 M50 60 L38 44 M50 60 L66 50" fill="none" stroke="#F4F1EA" strokeWidth="3" strokeLinecap="round" />
        <text x="70" y="86" fontFamily="Caveat, cursive" fontSize="22" fill="#F4F1EA">click!</text>
      </svg>
    </section>
  );
}
