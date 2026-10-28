import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

/**
 * One client island that wires every page-level animation onto the
 * server-rendered markup via data attributes:
 *   .rv               scroll reveal (fade + slide + un-rotate), batched
 *   .mask             colour wipe reveal, inner content scales down
 *   [data-hscroll]    pinned horizontal scroll ([data-htrack] inside)
 *   [data-speed]      scroll parallax for floating shapes / stickers
 *   [data-depth]      mouse parallax for hero collage
 *   [data-count]      count-up numbers
 *   [data-magnetic]   magnetic buttons
 *   [data-tilt]       3D tilt on hover
 *   [data-cursor]     custom cursor label
 *   [data-velocity]   marquee speeds up with scroll velocity
 * Everything is skipped under prefers-reduced-motion; heavy pointer effects are desktop-only.
 */
export function initMotion(cursor: HTMLElement): () => void {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    document.documentElement.classList.remove("js");
    return () => {};
  }
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  const cleanups: Array<() => void> = [];

  /* ── Smooth scroll (Lenis) driven by GSAP's ticker ── */
  const lenis = new Lenis({ anchors: true, lerp: 0.1 });
  lenis.on("scroll", ScrollTrigger.update);
  const raf = (t: number) => lenis.raf(t * 1000);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);
  cleanups.push(() => {
    gsap.ticker.remove(raf);
    lenis.destroy();
  });

  const ctx = gsap.context(() => {
    const mm = gsap.matchMedia();

    /* ── Horizontal pinned showcase (desktop) ── */
    let containerAnim: gsap.core.Tween | undefined;
    mm.add("(min-width: 768px)", () => {
      const sec = document.querySelector<HTMLElement>("[data-hscroll]");
      const track = sec?.querySelector<HTMLElement>("[data-htrack]");
      if (!sec || !track) return;
      const dist = () => Math.max(0, track.scrollWidth - window.innerWidth);
      containerAnim = gsap.to(track, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: {
          trigger: sec,
          start: "top top",
          end: () => `+=${dist()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
      // Wipe-reveal each panel as it slides into view.
      track.querySelectorAll<HTMLElement>(".mask").forEach((el) => {
        gsap.set(el.firstElementChild, { scale: 1.2 });
        gsap
          .timeline({
            scrollTrigger: { trigger: el, containerAnimation: containerAnim, start: "left 90%" },
          })
          .to(el, { "--mask": 0, duration: 0.9, ease: "expo.out" })
          .to(el.firstElementChild, { scale: 1, duration: 1.4, ease: "expo.out" }, 0);
      });
      return () => (containerAnim = undefined);
    });

    /* ── Mask reveals (outside the horizontal track, and all masks on mobile) ── */
    gsap.utils.toArray<HTMLElement>(".mask").forEach((el) => {
      const inTrack = !!el.closest("[data-htrack]");
      const run = () => {
        gsap.set(el.firstElementChild, { scale: 1.2 });
        gsap
          .timeline({ scrollTrigger: { trigger: el, start: "top 88%" } })
          .to(el, { "--mask": 0, duration: 0.9, ease: "expo.out", delay: 0.1 })
          .to(el.firstElementChild, { scale: 1, duration: 1.4, ease: "expo.out" }, 0);
      };
      if (inTrack) mm.add("(max-width: 767px)", run);
      else run();
    });

    /* ── Scroll reveal, batched so siblings stagger ── */
    ScrollTrigger.batch(".rv:not(.mask)", {
      start: "top 92%",
      once: true,
      onEnter: (els) =>
        gsap.to(els, { opacity: 1, y: 0, rotate: 0, duration: 0.9, ease: "expo.out", stagger: 0.08, overwrite: true }),
    });

    /* ── Count-up ── */
    gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
      const to = Number(el.dataset.count) || 0;
      const obj = { v: 0 };
      el.textContent = "0";
      gsap.to(obj, {
        v: to,
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
        onUpdate: () => (el.textContent = String(Math.round(obj.v))),
      });
    });

    /* ── Scroll parallax for floats/stickers ── */
    gsap.utils.toArray<HTMLElement>("[data-speed]").forEach((el) => {
      const s = Number(el.dataset.speed) || 0;
      gsap.fromTo(
        el,
        { y: () => -s * window.innerHeight * 0.5, rotate: -s * 40 },
        {
          y: () => s * window.innerHeight * 0.5,
          rotate: s * 40,
          ease: "none",
          scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true, invalidateOnRefresh: true },
        },
      );
    });
  });
  cleanups.push(() => ctx.revert());

  /* ── Marquee speed follows scroll velocity ── */
  const marquees = Array.from(document.querySelectorAll<HTMLElement>("[data-velocity]"))
    .flatMap((el) => el.getAnimations());
  let boost = 1;
  const onLenis = ({ velocity }: { velocity: number }) => {
    boost = 1 + Math.min(Math.abs(velocity) / 8, 4);
  };
  lenis.on("scroll", onLenis);
  const decay = () => {
    boost += (1 - boost) * 0.06;
    marquees.forEach((a) => (a.playbackRate = boost));
  };
  gsap.ticker.add(decay);
  cleanups.push(() => gsap.ticker.remove(decay));

  /* ── Pointer effects (desktop only) ── */
  if (fine) {
    const root = document.documentElement;
    root.classList.add("has-cursor");
    
    const label = cursor.querySelector<HTMLElement>(".cursor-label")!;
    const cx = gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3.out" });
    const cy = gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3.out" });

    const depth = Array.from(document.querySelectorAll<HTMLElement>("[data-depth]")).map((el) => ({
      d: Number(el.dataset.depth) || 0,
      x: gsap.quickTo(el, "x", { duration: 1, ease: "power3.out" }),
      y: gsap.quickTo(el, "y", { duration: 1, ease: "power3.out" }),
    }));

    let mag: HTMLElement | null = null;
    let tilt: HTMLElement | null = null;

    const onMove = (e: MouseEvent) => {
      cx(e.clientX);
      cy(e.clientY);
      const nx = e.clientX / innerWidth - 0.5;
      const ny = e.clientY / innerHeight - 0.5;
      depth.forEach((l) => {
        l.x(nx * l.d * -45);
        l.y(ny * l.d * -45);
      });
      if (mag) {
        const r = mag.getBoundingClientRect();
        gsap.to(mag, {
          x: (e.clientX - (r.left + r.width / 2)) * 0.35,
          y: (e.clientY - (r.top + r.height / 2)) * 0.45,
          duration: 0.5,
          ease: "expo.out",
        });
      }
      if (tilt) {
        const inner = tilt.querySelector<HTMLElement>(".tilt");
        const r = tilt.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        if (inner) inner.style.transform = `perspective(800px) rotateX(${-py * 12}deg) rotateY(${px * 14}deg)`;
      }
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as Element | null;
      if (!el?.closest) return;
      const m = el.closest<HTMLElement>("[data-magnetic]");
      if (m !== mag) {
        if (mag) gsap.to(mag, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,0.5)" });
        mag = m;
      }
      const t = el.closest<HTMLElement>("[data-tilt]");
      if (t !== tilt) {
        tilt?.querySelector<HTMLElement>(".tilt")?.style.removeProperty("transform");
        tilt = t;
      }
      const view = el.closest<HTMLElement>("[data-cursor]");
      cursor.classList.toggle("is-view", !!view);
      if (view) label.textContent = view.dataset.cursor ?? "";
      cursor.classList.toggle("is-link", !view && !!el.closest("a, button, label, input, select, textarea"));
    };

    const onLeave = () => {
      if (mag) gsap.to(mag, { x: 0, y: 0, duration: 0.6 });
      tilt?.querySelector<HTMLElement>(".tilt")?.style.removeProperty("transform");
      mag = tilt = null;
      cursor.classList.remove("is-view", "is-link");
    };

    addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.documentElement.addEventListener("mouseleave", onLeave);
    cleanups.push(() => {
      removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      root.classList.remove("has-cursor");
    });
  }

  // Fonts change layout height → recompute trigger positions once they're in.
  document.fonts?.ready.then(() => ScrollTrigger.refresh());

  return () => cleanups.reverse().forEach((fn) => fn());
}
