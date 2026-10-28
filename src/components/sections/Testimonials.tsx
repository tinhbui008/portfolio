import { site, swatch, testimonials } from "@/lib/content";
import { Tape } from "@/components/ui/Art";

export function Testimonials() {
  const logos = [...site.clients, ...site.clients];
  return (
    <section className="sec !pt-10" aria-labelledby="cl-h">
      <div className="wrap sec-head">
        <div>
          <p className="kick rv">people said ↓</p>
          <h2 id="cl-h" className="disp h2 rv">
            Kind <span className="ser !text-yellow">words</span>
          </h2>
        </div>
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

      <div className="wrap mt-[72px] grid grid-cols-3 items-start gap-[30px] max-md:grid-cols-1">
        {testimonials.map((t, i) => (
          <div key={i} className="rv" style={t.offset ? { marginTop: 48 } : undefined}>
            <figure
              className="relative m-0 flex min-h-[330px] flex-col justify-between gap-9 px-[34px] pb-[34px] pt-10 text-ink shadow-[0_30px_40px_-24px_rgba(0,0,0,.8)] transition-transform duration-500 [transition-timing-function:var(--ease-bounce)] hover:!rotate-0 hover:scale-[1.03]"
              style={{ background: swatch(t.color), transform: `rotate(${t.rotate}deg)` }}
            >
              <Tape color={t.tape} />
              <blockquote className="m-0">
                <span aria-hidden="true" className={`ser block h-10 text-[110px] leading-[.5] ${i === 1 ? "text-pink" : ""}`}>
                  “
                </span>
                <q className="text-[22px] font-semibold leading-[1.35] [quotes:none]">{t.quote}</q>
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
