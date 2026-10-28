import type { CSSProperties } from "react";
import { site, swatch } from "@/lib/content";

/** Renders **bold** segments from the JSON copy. */
function rich(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
    part.startsWith("**") ? (
      <b key={i} className="font-bold text-lime">
        {part.slice(2, -2)}
      </b>
    ) : (
      part
    ),
  );
}

export function About() {
  const { about } = site;
  return (
    <section id="about" className="sec wrap !pt-10">
      <div className="grid grid-cols-12 items-center gap-8 max-md:grid-cols-1">
        <div className="rv relative col-span-5 max-md:col-span-1">
          <div className="aspect-square overflow-hidden rounded-[50%_50%_46%_54%/55%_45%_55%_45%] bg-pink">
            <svg viewBox="0 0 400 400" width="100%" height="100%" role="img" aria-label="Avatar minh họa của designer">
              <rect width="400" height="400" fill="#FF5BA7" />
              <path d="M70 400 C 80 300, 140 270, 200 270 C 260 270, 320 300, 330 400 Z" fill="#4D6BFF" />
              <rect x="178" y="220" width="44" height="60" fill="#F4F1EA" />
              <ellipse cx="200" cy="170" rx="80" ry="90" fill="#F4F1EA" />
              <path d="M118 160 C 110 70, 200 50, 250 80 C 300 100, 290 150, 284 168 C 250 150, 200 120, 160 110 C 150 140, 130 150, 118 160 Z" fill="#0E0E13" />
              <circle cx="170" cy="178" r="8" fill="#0E0E13" />
              <circle cx="232" cy="178" r="8" fill="#0E0E13" />
              <circle cx="155" cy="205" r="12" fill="#FF7A1A" opacity=".6" />
              <circle cx="247" cy="205" r="12" fill="#FF7A1A" opacity=".6" />
              <path d="M182 215 Q 201 234 220 215" fill="none" stroke="#0E0E13" strokeWidth="5" strokeLinecap="round" />
              <path d="M262 300 L300 230 L312 236 L274 306 Z" fill="#C8FF2E" />
              <path d="M262 300 L274 306 L258 316 Z" fill="#0E0E13" />
            </svg>
          </div>
          <div
            className="sticker right-[2%] top-[4%] size-[120px] rounded-full bg-lime text-[34px]"
            style={{ "--r": "12deg" } as CSSProperties}
            data-speed="-0.08"
          >
            {"it’s\nme!"}
          </div>
          <div
            className="sticker -left-[2%] bottom-[8%] rounded-[14px] bg-yellow px-[18px] py-2.5 text-[30px]"
            style={{ "--r": "-8deg" } as CSSProperties}
            data-speed="0.08"
          >
            {site.name} ✎
          </div>
        </div>

        <div className="col-span-6 col-start-7 flex flex-col gap-[30px] max-md:col-span-1 max-md:col-start-1">
          <h2 className="disp h2 rv !text-[clamp(64px,8vw,130px)]">About</h2>
          <p className="rv m-0 text-[32px] font-medium leading-[1.22] tracking-[-.015em] max-md:text-2xl">{rich(about.lead)}</p>
          <div className="rv flex flex-wrap gap-2">
            {about.tools.map((t) => (
              <span
                key={t.name}
                className={`rounded-full px-[18px] py-2.5 text-[15px] font-bold ${t.color === "blue" ? "text-cream" : "text-ink"}`}
                style={{ background: swatch(t.color) }}
              >
                {t.name}
              </span>
            ))}
          </div>
          <div className="rv grid grid-cols-3 gap-3">
            {about.stats.map((s) => (
              <div key={s.label} className="rounded-[28px] bg-card p-6">
                <b
                  className="block text-[88px] font-extrabold leading-[.9] tracking-[-.03em] [font-variation-settings:'wdth'_75,'opsz'_96] max-md:text-[52px]"
                  style={{ color: swatch(s.color) }}
                >
                  <span data-count={s.value}>{s.value}</span>
                  {s.suffix}
                </b>
                <span className="text-[15px] text-mute">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
