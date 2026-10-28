import { site } from "@/lib/content";

const band =
  "absolute -left-[5%] -right-[5%] top-1/2 overflow-hidden text-ink";
const item =
  "flex items-center gap-[30px] whitespace-nowrap py-3.5 pr-[30px] text-[58px] font-extrabold uppercase [font-variation-settings:'wdth'_75,'opsz'_96] max-md:text-[38px]";

function Track({ words, sep, reverse }: { words: string[]; sep: string; reverse?: boolean }) {
  const text = words.map((w) => `${w} ${sep} `).join("");
  return (
    <div className={`mq-track ${reverse ? "rev" : ""}`} data-velocity>
      <span className={item}>{text}</span>
      <span className={item}>{text}</span>
    </div>
  );
}

/** Two crossing marquee bands. Speed nudged by scroll velocity (Motion.tsx). */
export function Marquee() {
  return (
    <div
      className="relative mt-5 h-[260px] overflow-hidden max-md:h-[200px]"
      aria-label={`Dịch vụ: ${site.marquee.a.join(", ")}`}
      role="img"
    >
      <div className={`${band} translate-y-[-20%] rotate-[2.5deg] bg-pink`} aria-hidden="true">
        <Track words={site.marquee.b} sep="✶" reverse />
      </div>
      <div className={`${band} z-[2] translate-y-[-70%] -rotate-3 bg-lime`} aria-hidden="true">
        <Track words={site.marquee.a} sep="●" />
      </div>
    </div>
  );
}
