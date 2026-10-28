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
        <div>
          <p className="kick rv">what I do ↓</p>
          <h2 className="disp h2 rv">
            Services <span className="ser">&amp; craft</span>
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-[18px] max-[1100px]:grid-cols-2 max-md:grid-cols-1">
        {services.map((s, i) => (
          <div key={s.title} className="rv">
            <a
              href="#contact"
              className={`group relative flex h-full min-h-[460px] flex-col justify-between gap-6 overflow-hidden rounded-[28px] p-[30px] text-ink no-underline transition-transform duration-[550ms] [transition-timing-function:var(--ease-bounce)] max-md:min-h-[300px] ${
                i % 2 ? "hover:-translate-y-3 hover:rotate-2" : "hover:-translate-y-3 hover:-rotate-2"
              }`}
              style={{ background: swatch(s.color) }}
            >
              {/* Halftone corner */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(14,14,19,.22)_32%,transparent_35%)] bg-[length:12px_12px] [mask-image:linear-gradient(200deg,#000,transparent_55%)]"
              />
              <span
                aria-hidden="true"
                className="ser absolute right-[18px] top-1.5 text-[150px] leading-none text-transparent opacity-55 [-webkit-text-stroke:2px_#0E0E13]"
              >
                {i + 1}
              </span>
              <svg
                viewBox="0 0 84 84"
                aria-hidden="true"
                className="relative size-[84px] transition-transform duration-[800ms] [transition-timing-function:var(--ease-bounce)] group-hover:rotate-90 group-hover:scale-110"
              >
                {icons[s.icon]}
              </svg>
              <div className="relative">
                <h3 className="m-0 text-[46px] font-extrabold uppercase leading-[.9] tracking-[-.02em] [font-variation-settings:'wdth'_75,'opsz'_96]">
                  {s.title}
                </h3>
                <p className="mb-0 mt-3.5 text-base font-medium leading-normal">{s.body}</p>
              </div>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
