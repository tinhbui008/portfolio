"use client";

import { useRef, useState, useLayoutEffect } from "react";
import type { Category, Work } from "@/lib/content";
import { Art, Tape } from "@/components/ui/Art";

type Libs = { gsap: typeof import("gsap").gsap; Flip: typeof import("gsap/Flip").Flip; ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger };
let libs: Libs | null = null;
/** GSAP Flip is only needed once someone filters — load it on first use. */
async function loadLibs(): Promise<Libs> {
  if (libs) return libs;
  const [{ gsap }, { Flip }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/Flip"), import("gsap/ScrollTrigger")]);
  gsap.registerPlugin(Flip, ScrollTrigger);
  return (libs = { gsap, Flip, ScrollTrigger });
}

const span: Record<Work["size"], string> = {
  big: "col-span-2 row-span-2",
  wide: "col-span-2",
  tall: "row-span-2",
  sq: "",
};

export function Works({ works, categories }: { works: Work[]; categories: Category[] }) {
  const [filter, setFilter] = useState("all");
  const grid = useRef<HTMLDivElement>(null);
  const flipState = useRef<ReturnType<Libs["Flip"]["getState"]> | null>(null);
  const label = (id: string) => categories.find((c) => c.id === id)?.label ?? id;
  const visible = works.filter((w) => filter === "all" || w.category === filter);

  const pick = async (id: string) => {
    if (id === filter) return;
    if (grid.current && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const { Flip } = await loadLibs();
      flipState.current = Flip.getState(grid.current.querySelectorAll("[data-flip-id]"));
    }
    setFilter(id);
  };

  // Animate re-ordering with GSAP Flip after React commits the new list.
  useLayoutEffect(() => {
    const state = flipState.current;
    if (!state || !grid.current || !libs) return;
    flipState.current = null;
    const { gsap, Flip, ScrollTrigger } = libs;
    Flip.from(state, {
      targets: grid.current.querySelectorAll("[data-flip-id]"),
      duration: 0.7,
      ease: "expo.out",
      absolute: true,
      onEnter: (els) =>
        gsap.fromTo(
          els,
          { opacity: 0, y: 40, rotate: 4, scale: 0.9 },
          { opacity: 1, y: 0, rotate: 0, scale: 1, duration: 0.65, stagger: 0.05, ease: "back.out(1.6)" },
        ),
      onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.9, duration: 0.3 }),
      onComplete: () => ScrollTrigger.refresh(),
    });
  }, [filter]);

  return (
    <section id="works" className="sec wrap">
      <div className="sec-head">
        <div>
          <p className="kick rv">({String(visible.length).padStart(2, "0")}) dự án chọn lọc ↓</p>
          <h2 className="disp h2 rv">
            Selected <span className="ser">works</span>
          </h2>
        </div>
        <div role="group" aria-label="Lọc theo hạng mục" className="rv flex flex-wrap gap-2 rounded-full bg-card p-1.5">
          {categories.map((c) => {
            const on = c.id === filter;
            return (
              <button
                key={c.id}
                type="button"
                aria-pressed={on}
                onClick={() => pick(c.id)}
                className={`min-h-11 cursor-pointer rounded-full border-0 px-5 text-[15px] font-bold transition-[background,color,transform] duration-300 [transition-timing-function:var(--ease-bounce)] ${
                  on ? "-rotate-3 bg-lime text-ink" : "bg-transparent text-cream hover:bg-cream/10"
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>
        <svg className="float" style={{ right: "34%", top: -30 }} width="120" height="120" viewBox="0 0 120 120" aria-hidden="true">
          <path
            className="dr"
            style={{ "--len": "420" } as React.CSSProperties}
            d="M60 10 L70 48 L110 52 L78 74 L90 112 L60 88 L30 112 L42 74 L10 52 L50 48 Z"
            fill="none"
            stroke="#FFD23F"
            strokeWidth="3"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="rv">
        <div
          ref={grid}
          className="grid grid-flow-dense auto-rows-[260px] grid-cols-4 gap-[22px] max-md:auto-rows-[180px] max-md:grid-cols-2 max-md:gap-4"
        >
          {visible.map((w) => (
            <a
              key={w.id}
              href="#case"
              data-flip-id={w.id}
              data-tilt
              data-cursor="Xem!"
              aria-label={`${w.title} — ${label(w.category)}`}
              className={`group relative block text-inherit no-underline ${span[w.size]} ${w.size === "big" ? "max-md:col-span-2" : ""}`}
            >
              {/* Tilt lives on an inner element: Flip animates the outer link's transform */}
              <div
                className="relative size-full rotate-(--rot) transition-transform duration-[600ms] [transition-timing-function:var(--ease-bounce)] group-hover:-translate-y-1.5 group-hover:rotate-0"
                style={{ "--rot": `${w.rot}deg` } as React.CSSProperties}
              >
                <Tape color={w.tape} />
                <div className="tilt paper-frame relative size-full transition-transform duration-[450ms] [transition-timing-function:var(--ease-out-expo)] will-change-transform">
                  <Art
                    {...w}
                    alt={w.title}
                    className="transition-transform duration-[800ms] [transition-timing-function:var(--ease-out-expo)] group-hover:rotate-[1.5deg] group-hover:scale-[1.08]"
                  />
                  <div className="absolute bottom-3.5 left-3.5 flex translate-y-4 -rotate-3 flex-wrap gap-2 opacity-0 transition-[opacity,translate] duration-500 [transition-timing-function:var(--ease-bounce)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 max-md:translate-y-0 max-md:opacity-100">
                    <span className="rounded-full bg-cream px-3.5 py-2 text-[15px] font-bold text-ink">{w.title}</span>
                    <span className="rounded-full bg-lime px-3.5 py-2 text-[15px] font-bold text-ink">{label(w.category)}</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
