import { featured, swatch } from "@/lib/content";
import { Art } from "@/components/ui/Art";

/**
 * Horizontal showcase. Desktop: the section pins and the track scrubs sideways
 * (GSAP ScrollTrigger in Motion.tsx, selector [data-hscroll]). Mobile: native swipe with snap.
 */
export function Featured() {
  return (
    <section data-hscroll aria-labelledby="feat-h" className="relative overflow-hidden py-[110px] max-md:overflow-visible max-md:py-[70px]">
      <div className="wrap sec-head !mb-14">
        <h2 id="feat-h" className="disp h2 rv">
          Featured <span className="hand !text-pink">big ones!</span>
        </h2>
        <p className="rv m-0 font-semibold text-mute">
          {String(featured.length).padStart(2, "0")} tác phẩm lớn — cuộn để trượt →
        </p>
      </div>

      <div className="max-md:snap-x max-md:snap-mandatory max-md:overflow-x-auto max-md:pt-[26px]">
        <div data-htrack className="flex w-max items-center gap-7 px-12 will-change-transform max-md:gap-4 max-md:px-5">
          {featured.map((f, i) => (
            <a
              key={f.id}
              href="#case"
              data-cursor="Xem!"
              className="group relative flex flex-none flex-col gap-4 text-inherit no-underline max-md:!w-[80vw] max-md:snap-start"
              style={{ width: f.width }}
            >
              <span
                className="hand absolute -top-[22px] left-6 z-[3] flex size-[72px] -rotate-[10deg] items-center justify-center rounded-full text-[34px] text-ink"
                style={{ background: swatch(f.badge) }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div
                className="mask rv overflow-hidden rounded-[32px] max-md:!h-auto max-md:aspect-[4/5]"
                style={{ height: f.height }}
              >
                <Art {...f} alt={f.title} className="transition-transform duration-[900ms] [transition-timing-function:var(--ease-out-expo)] group-hover:scale-105" />
              </div>
              <div className="flex justify-between gap-4 text-lg font-bold">
                <span>{f.title}</span>
                <span className="font-medium text-mute">{f.label}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
