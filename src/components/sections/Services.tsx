import { services, swatch, type Service } from "@/lib/content";

const icons: Record<Service["icon"], React.ReactNode> = {
  star: (
    <>
      <circle cx="42" cy="42" r="38" fill="none" stroke="#0E0E13" strokeWidth="5" />
      <path d="M42 16 L48 36 L68 42 L48 48 L42 68 L36 48 L16 42 L36 36 Z" fill="#0E0E13" />
    </>
  ),
  leaf: <path d="M10 70 C 20 30, 40 20, 74 12 C 66 44, 52 64, 14 74 Z" fill="#0E0E13" />,
  poster: (
    <>
      <rect x="16" y="8" width="52" height="68" rx="4" fill="none" stroke="#0E0E13" strokeWidth="5" />
      <circle cx="42" cy="36" r="14" fill="#0E0E13" />
    </>
  ),
  box: (
    <path
      d="M14 28 L42 12 L70 28 L70 62 L42 76 L14 62 Z M14 28 L42 44 L70 28 M42 44 L42 76"
      fill="none"
      stroke="#0E0E13"
      strokeWidth="5"
      strokeLinejoin="round"
    />
  ),
};

export function Services() {
  return (
    <section id="services" className="sec wrap !pt-10">
      <div className="sec-head">
        <h2 className="disp h2 rv">
          Services <span className="hand">what I do</span>
        </h2>
      </div>
      <div className="grid grid-cols-4 gap-4 max-[1100px]:grid-cols-2 max-md:grid-cols-1">
        {services.map((s, i) => (
          <a
            key={s.title}
            href="#contact"
            className={`rv group relative flex min-h-[420px] flex-col justify-between gap-6 overflow-hidden rounded-[32px] p-[30px] text-ink no-underline transition-transform duration-500 [transition-timing-function:var(--ease-bounce)] max-md:min-h-[280px] ${
              i % 2 ? "hover:-translate-y-2.5 hover:rotate-[1.5deg]" : "hover:-translate-y-2.5 hover:-rotate-[1.5deg]"
            }`}
            style={{ background: swatch(s.color) }}
          >
            <svg
              viewBox="0 0 84 84"
              aria-hidden="true"
              className="size-[84px] transition-transform duration-[800ms] [transition-timing-function:var(--ease-bounce)] group-hover:rotate-90 group-hover:scale-110"
            >
              {icons[s.icon]}
            </svg>
            <div>
              <h3 className="m-0 text-[46px] font-extrabold uppercase leading-[.9] tracking-[-.02em] [font-variation-settings:'wdth'_75,'opsz'_96]">
                {s.title}
              </h3>
              <p className="mb-0 mt-3.5 text-base font-medium leading-normal">{s.body}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
