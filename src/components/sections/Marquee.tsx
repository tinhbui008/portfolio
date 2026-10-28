import { Fragment } from "react";
import { site } from "@/lib/content";

const band =
  "absolute -left-[5%] -right-[5%] top-1/2 overflow-hidden text-ink";
const item =
  "flex items-center gap-7 whitespace-nowrap py-3 pr-7 text-[62px] font-extrabold uppercase [font-variation-settings:'wdth'_75,'opsz'_96] max-md:text-[38px]";
/** Outlined word: transparent fill, ink stroke. */
const ol = "text-transparent [-webkit-text-stroke:2px_#0E0E13]";

/** Lime band: words alternate solid / outlined, separated by dots. */
function WordsA() {
  return site.marquee.a.map((w, i) => (
    <Fragment key={w}>
      <span className={i % 2 ? ol : undefined}>{w}</span> ●
    </Fragment>
  ));
}

/** Pink band: groups joined by a serif "&", separated by stars. */
function WordsB() {
  let n = 0;
  return site.marquee.b.map((group, gi) => (
    <Fragment key={gi}>
      {group.map((w, wi) => (
        <Fragment key={w}>
          {wi > 0 && <span className="ser text-[.9em]">&amp;</span>}
          <span className={n++ % 2 ? undefined : ol}>{w}</span>
        </Fragment>
      ))}{" "}
      ✶
    </Fragment>
  ));
}

function Track({ reverse, children }: { reverse?: boolean; children: React.ReactNode }) {
  return (
    <div className={`mq-track ${reverse ? "rev" : ""}`} data-velocity>
      <span className={item}>{children}</span>
      <span className={item}>{children}</span>
    </div>
  );
}

/** Two crossing marquee bands. Speed nudged by scroll velocity (Motion.tsx). */
export function Marquee() {
  return (
    <div
      className="relative mt-2.5 h-[280px] overflow-hidden max-md:h-[200px]"
      aria-label={`Dịch vụ: ${site.marquee.a.join(", ")}`}
      role="img"
    >
      <div className={`${band} translate-y-[-15%] rotate-[2.5deg] bg-pink`} aria-hidden="true">
        <Track reverse>
          <WordsB />
        </Track>
      </div>
      <div className={`${band} z-[2] translate-y-[-70%] -rotate-3 bg-lime`} aria-hidden="true">
        <Track>
          <WordsA />
        </Track>
      </div>
    </div>
  );
}
