import { caseStudy, swatch } from "@/lib/content";
import { Art } from "@/components/ui/Art";

export function CaseStudy() {
  return (
    <section id="case" className="sec wrap">
      <div className="sec-head">
        <div>
          <p className="hand rv mb-2 mt-0 text-[32px] text-pink">case study ↓</p>
          <h2 className="disp h2 rv">{caseStudy.title}</h2>
        </div>
        <p className="rv m-0 max-w-[440px] text-lg leading-[1.55] text-mute">{caseStudy.summary}</p>
      </div>

      <div className="mask rv h-[600px] rounded-[36px] max-md:h-[320px]">
        <Art {...caseStudy.hero} />
      </div>

      <div className="mt-4 grid grid-cols-4 gap-4 max-[1100px]:grid-cols-2 max-md:grid-cols-1">
        {caseStudy.steps.map((s, i) => (
          <div key={s.title} className="rv flex flex-col gap-3.5 rounded-[28px] bg-card p-7">
            <span
              className="flex size-[52px] items-center justify-center rounded-full text-xl font-extrabold text-ink"
              style={{ background: swatch(s.color) }}
            >
              {i + 1}
            </span>
            <h3 className="m-0 text-[30px] font-extrabold tracking-[-.02em]">{s.title}</h3>
            {s.sketch && (
              <div className="mask rv h-[170px] rounded-[18px]">
                <Art art="sketch" bg="#F4F1EA" fg="#0E0E13" />
              </div>
            )}
            <p className="m-0 text-base leading-[1.55] text-mute">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
