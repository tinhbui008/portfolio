import { site } from "@/lib/content";

/** Intro loader: name drawn by stroke, then the panel slides up (pure CSS, < 2s). */
export function Loader() {
  return (
    <div
      aria-hidden="true"
      className="loader pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-lime [animation:ldOut_.55s_var(--ease-out-expo)_1.45s_forwards] motion-reduce:hidden max-md:hidden"
    >
      <svg width="820" height="260" viewBox="0 0 820 260" className="h-auto max-w-[90vw]">
        <text
          x="40"
          y="165"
          className="font-hand text-[150px] font-bold [fill:transparent] [stroke:var(--color-ink)] [stroke-width:1.6] [stroke-dasharray:900] [stroke-dashoffset:900] [animation:draw_1.1s_var(--ease-out-expo)_forwards,fillIn_.3s_ease_.95s_forwards]"
        >
          {site.name}
        </text>
        <path
          d="M60 205 C 240 185, 500 225, 770 190"
          fill="none"
          stroke="#FF5BA7"
          strokeWidth="10"
          strokeLinecap="round"
          className="[stroke-dasharray:600] [stroke-dashoffset:600] [animation:draw_.5s_var(--ease-out-expo)_.9s_forwards]"
        />
      </svg>
    </div>
  );
}
