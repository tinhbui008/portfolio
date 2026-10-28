import { site, swatch, testimonials } from "@/lib/content";

export function Testimonials() {
  const logos = [...site.clients, ...site.clients];
  return (
    <section className="sec !pt-10" aria-labelledby="cl-h">
      <div className="wrap sec-head">
        <h2 id="cl-h" className="disp h2 rv">
          Kind words <span className="hand !text-yellow">♥</span>
        </h2>
      </div>

      <div className="overflow-hidden border-y border-cream/12 py-[26px]" role="img" aria-label={`Logo khách hàng: ${site.clients.join(", ")}`}>
        <div className="mq-track slow" data-velocity aria-hidden="true">
          {logos.map((c, i) => (
            <span
              key={i}
              className="flex items-center gap-3 whitespace-nowrap px-11 text-[34px] font-extrabold uppercase text-mute [font-variation-settings:'wdth'_75]"
            >
              <i className={`inline-block size-7 bg-mute ${i % 2 ? "rounded-full" : "rounded-lg"}`} />
              {c}
            </span>
          ))}
        </div>
      </div>

      <div className="wrap mt-16 grid grid-cols-3 items-start gap-6 max-md:grid-cols-1">
        {testimonials.map((t, i) => (
          <div key={i} className="rv" style={t.offset ? { marginTop: 40 } : undefined}>
            <figure
              className="m-0 flex min-h-[320px] flex-col justify-between gap-9 rounded-[28px] p-[34px] text-ink transition-transform duration-500 [transition-timing-function:var(--ease-bounce)] hover:!rotate-0 hover:scale-[1.02]"
              style={{ background: swatch(t.color), transform: `rotate(${t.rotate}deg)` }}
            >
              <blockquote className="m-0">
                <q className="text-[22px] font-semibold leading-[1.35]">{t.quote}</q>
              </blockquote>
              <figcaption className="flex items-center gap-3.5">
                <i className={`block size-11 rounded-full ${i === 1 ? "bg-pink" : "bg-ink"}`} />
                <span>
                  <b>{t.name}</b>
                  <small className="block text-sm opacity-75">{t.role}</small>
                </span>
              </figcaption>
            </figure>
          </div>
        ))}
      </div>
    </section>
  );
}
