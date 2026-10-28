"use client";

import { useEffect, useRef } from "react";

/**
 * Client island for page-level motion. GSAP + Lenis are loaded lazily once the
 * browser is idle, so they never block first paint or input (keeps TBT low).
 * See initMotion.ts for what each data attribute does.
 */
export function Motion() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    let cancelled = false;
    const start = () =>
      import("./initMotion").then(({ initMotion }) => {
        if (!cancelled && cursorRef.current) cleanup = initMotion(cursorRef.current);
      });
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1));
    const id = idle(start, { timeout: 1200 } as IdleRequestOptions);
    return () => {
      cancelled = true;
      (window.cancelIdleCallback ?? window.clearTimeout)(id as number);
      cleanup?.();
    };
  }, []);

  return (
    <div ref={cursorRef} className="cursor" aria-hidden="true">
      <div className="cursor-dot">
        <span className="cursor-label">Xem</span>
      </div>
    </div>
  );
}
