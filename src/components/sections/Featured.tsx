import type { CSSProperties } from "react";
import { featured, site, swatch } from "@/lib/content";
import { Art } from "@/components/ui/Art";

/**
 * "Wall of fame": artwork pinned to a dotted wall. Desktop: the section pins and
 * the track scrubs sideways (GSAP ScrollTrigger in Motion.tsx, selector [data-hscroll]).
 * Mobile: native swipe with snap.
 */
export function Featured() {
  return (
    <section
      data-hscroll
      aria-labelledby="feat-h"
      className="relative overflow-hidden bg-[#16161D] pb-[130px] pt-[110px] before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(rgba(244,241,234,.07)_1px,transparent_1.4px)] before:bg-[length:22px_22px] before:content-[''] max-md:overflow-visible max-md:py-[70px]"
    >
      <div className="wrap sec-head !mb-10">
        <div>
          <p className="kick rv">the wall of fame →</p>
          <h2 id="feat-h" className="disp h2 rv">
            Featured <span className="ser !text-pink">pieces</span>
          </h2>
        </div>
        <p className="rv m-0 max-w-[300px] font-semibold text-mute">{site.featuredNote}</p>
      </div>

      <div className="max-md:snap-x max-md:snap-mandatory max-md:overflow-x-auto">
        <div data-htrack className="relative flex w-max items-center gap-14 px-16 pt-[30px] will-change-transform max-md:gap-7 max-md:px-7">
          {featured.map((f) => (
            <a
              key={f.id}
              href="#case"
              data-cursor="Xem!"
              className="group relative flex flex-none rotate-(--rot) flex-col gap-[18px] text-inherit no-underline transition-transform duration-[600ms] [transition-timing-function:var(--ease-bounce)] hover:rotate-0 hover:scale-[1.02] max-md:!w-[76vw] max-md:snap-center"
              style={{ width: f.width, "--rot": `${f.rot}deg` } as CSSProperties}
            >
              <span className="pin" style={{ background: swatch(f.pin) }} />
              <div
                className="mask rv overflow-hidden rounded shadow-[0_0_0_8px_#F4F1EA,0_40px_60px_-25px_rgba(0,0,0,.9)] max-md:!h-auto max-md:aspect-[4/5]"
                style={{ height: f.height }}
              >
                <Art {...f} alt={f.title} className="transition-transform duration-[900ms] [transition-timing-function:var(--ease-out-expo)] group-hover:scale-105" />
              </div>
              <div className="flex items-baseline justify-between gap-4 pt-1.5">
                <b className="hand text-[34px]">{f.title}</b>
                <span className="text-[15px] font-semibold uppercase tracking-[.06em] text-mute">{f.label}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
