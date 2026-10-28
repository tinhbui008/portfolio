import type { CSSProperties } from "react";
import { site, swatch } from "@/lib/content";

/** Renders **marked** segments from the JSON copy as the serif accent. */
function rich(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
    part.startsWith("**") ? (
      <span key={i} className="ser text-[1.12em] text-lime">
        {part.slice(2, -2)}
      </span>
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
        <div className="rv relative col-span-5 aspect-square max-md:col-span-1 max-md:mx-auto max-md:w-full max-md:max-w-[360px]">
          {/* Rotating name ring */}
          <svg className="av-ring absolute inset-0 [animation:spin_30s_linear_infinite]" viewBox="0 0 400 400" aria-hidden="true">
            <defs>
              <path id="ringAv" d="M200,200 m-186,0 a186,186 0 1,1 372,0 a186,186 0 1,1 -372,0" />
            </defs>
            <text className="fill-cream text-[17px] font-extrabold uppercase tracking-[3px]">
              <textPath href="#ringAv" textLength="1160">{about.ring}</textPath>
            </text>
          </svg>
          <div className="absolute inset-[11%] overflow-hidden rounded-full bg-pink shadow-[0_0_0_8px_#0E0E13,0_0_0_11px_#C8FF2E]">
            <svg viewBox="0 0 400 400" width="100%" height="100%" role="img" aria-label={`Avatar minh họa của ${site.name}`}>
              <rect width="400" height="400" fill="#FF5BA7" />
              <circle cx="200" cy="200" r="150" fill="none" stroke="#FFD23F" strokeWidth="2" strokeDasharray="3 9" />
              <path d="M70 400 C 80 300, 140 270, 200 270 C 260 270, 320 300, 330 400 Z" fill="#4D6BFF" />
              <path d="M120 400 L 200 300 L 280 400 Z" fill="#C8FF2E" opacity=".85" />
              <rect x="178" y="220" width="44" height="60" fill="#F4F1EA" />
              <ellipse cx="200" cy="170" rx="80" ry="90" fill="#F4F1EA" />
              <path d="M118 160 C 110 70, 200 50, 250 80 C 300 100, 290 150, 284 168 C 250 150, 200 120, 160 110 C 150 140, 130 150, 118 160 Z" fill="#0E0E13" />
              <circle cx="170" cy="178" r="8" fill="#0E0E13" />
              <circle cx="232" cy="178" r="8" fill="#0E0E13" />
              <circle cx="155" cy="205" r="12" fill="#FF7A1A" opacity=".6" />
              <circle cx="247" cy="205" r="12" fill="#FF7A1A" opacity=".6" />
              <path d="M182 215 Q 201 234 220 215" fill="none" stroke="#0E0E13" strokeWidth="5" strokeLinecap="round" />
              <path d="M262 300 L300 230 L312 236 L274 306 Z" fill="#FFD23F" />
              <path d="M262 300 L274 306 L258 316 Z" fill="#0E0E13" />
            </svg>
          </div>
          <div
            className="sticker right-0 top-[2%] size-[110px] rounded-full bg-lime text-[32px]"
            style={{ "--r": "12deg" } as CSSProperties}
            data-speed="-0.08"
          >
            {"it’s\nme!"}
          </div>
        </div>

        <div className="col-span-6 col-start-7 flex flex-col gap-[30px] max-md:col-span-1 max-md:col-start-1">
          <div>
            <p className="kick rv">hello, I’m ↓</p>
            <h2 className="disp h2 rv !text-[clamp(64px,8vw,130px)]">
              About <span className="ser">me</span>
            </h2>
          </div>
          <p className="rv m-0 text-[32px] font-medium leading-[1.22] tracking-[-.015em] max-md:text-2xl">{rich(about.lead)}</p>
          <div className="rv flex flex-wrap gap-2">
            {about.tools.map((t) => (
              <span
                key={t.name}
                className={`rounded-full px-[18px] py-2.5 text-[15px] font-bold transition-transform duration-[400ms] [transition-timing-function:var(--ease-bounce)] hover:-rotate-6 hover:scale-[1.08] ${t.color === "blue" ? "text-cream" : "text-ink"}`}
                style={{ background: swatch(t.color) }}
              >
                {t.name}
              </span>
            ))}
          </div>
          <div className="rv grid grid-cols-3 gap-3">
            {about.stats.map((s) => (
              <div key={s.label} className="rounded-3xl bg-card p-6">
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
