import type { CSSProperties } from "react";
import { caseStudy, swatch } from "@/lib/content";
import { Art, Tape } from "@/components/ui/Art";

export function CaseStudy() {
  return (
    <section id="case" className="sec wrap">
      <div className="sec-head">
        <div>
          <p className="kick rv">case study ↓</p>
          <h2 className="disp h2 rv">
            {caseStudy.title} <span className="ser">{caseStudy.titleAccent}</span>
          </h2>
        </div>
        <p className="rv m-0 max-w-[440px] text-lg leading-[1.55] text-mute">{caseStudy.summary}</p>
      </div>

      <div className="mask rv h-[600px] rounded-md shadow-[0_0_0_8px_#F4F1EA] max-md:h-[320px]">
        <Art {...caseStudy.hero} />
      </div>

      {/* Process board: paper notes taped on, joined by a hand-drawn line */}
      <div className="relative mt-14">
        <svg
          className="pointer-events-none absolute inset-x-[4%] top-[60px] z-0 h-[120px] max-[1100px]:hidden"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            className="dr"
            style={{ "--len": "1500" } as CSSProperties}
            d="M10 60 C 150 -10, 250 130, 400 60 S 650 -10, 800 60 S 1050 130, 1190 50"
            fill="none"
            stroke="#C8FF2E"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
        <div className="relative z-[1] grid grid-cols-4 gap-6 max-[1100px]:grid-cols-2 max-md:grid-cols-1">
          {caseStudy.steps.map((s, i) => (
            <div key={s.title} className="rv">
              <div
                className="relative flex rotate-(--rot) flex-col gap-3.5 bg-cream px-6 pb-[30px] pt-6 text-ink shadow-[0_24px_40px_-20px_rgba(0,0,0,.8)] transition-transform duration-[600ms] [transition-timing-function:var(--ease-bounce)] hover:-translate-y-2 hover:rotate-0"
                style={{ "--rot": `${s.rot}deg` } as CSSProperties}
              >
                <Tape color={s.tape} />
                <span className="ser text-[64px] font-medium leading-[.8]" style={{ color: swatch(s.color) }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="m-0 text-[30px] font-extrabold tracking-[-.02em]">{s.title}</h3>
                {s.sketch && (
                  <div className="mask rv h-[150px] rounded">
                    <Art art="sketch" bg="#E6E2D8" fg="#0E0E13" />
                  </div>
                )}
                <p className="m-0 text-base leading-[1.55] text-[#4A4852]">{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
