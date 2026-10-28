import type { CSSProperties } from "react";
import { site } from "@/lib/content";
import { Badge, Star } from "@/components/ui/Arrow";
import { ContactForm } from "./ContactForm";

// Non-breaking space: a plain space collapses between flex items.
const TALK = ["L", "e", "t", "’", "s", " ", "t", "a", "l", "k", "!"];

export function Contact() {
  const { contact } = site;
  const mailto = `mailto:${contact.email}`;
  return (
    <>
      <svg className="-mb-px block h-[70px] w-full" viewBox="0 0 1440 70" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 70 L0 35 Q 60 0 120 35 T 240 35 T 360 35 T 480 35 T 600 35 T 720 35 T 840 35 T 960 35 T 1080 35 T 1200 35 T 1320 35 T 1440 35 L1440 70 Z" fill="#C8FF2E" />
      </svg>
      <section id="contact" data-cursor-dark className="relative overflow-hidden bg-lime pb-10 pt-[70px] text-ink">
        <div className="float spin" data-speed="0.15" style={{ left: "4%", top: 40 }}>
          <Star size={110} fill="#0E0E13" />
        </div>
        <Badge id="ringCt" text={contact.badge} ring="#0E0E13" ink="#C8FF2E" core="#FF5BA7" style={{ right: "6%", top: 60 }}>
          <Star size={30} fill="#0E0E13" />
        </Badge>

        <div className="wrap">
          <p className="hand rv m-0 text-center text-[40px]">có dự án thú vị? ↓</p>
          <a
            href={mailto}
            aria-label="Let’s talk — gửi email"
            className="disp rv group flex flex-wrap justify-center !normal-case text-[clamp(100px,20vw,320px)] text-ink no-underline"
          >
            {TALK.map((ch, i) => (
              <span
                key={i}
                aria-hidden="true"
                style={{ transitionDelay: `${i * 25}ms` } as CSSProperties}
                className={`inline-block [text-shadow:.03em_.03em_0_var(--color-pink)] transition-[transform,translate,rotate,color] duration-500 [transition-timing-function:var(--ease-bounce)] ${
                  i % 2
                    ? "group-hover:translate-y-[8%] group-hover:rotate-[5deg]"
                    : "group-hover:-translate-y-[14%] group-hover:-rotate-6 group-hover:text-blue"
                }`}
              >
                {ch}
              </span>
            ))}
          </a>

          <div className="mt-14 grid grid-cols-12 gap-6 max-md:grid-cols-1">
            <div className="rv col-span-5 flex flex-col gap-[26px] max-md:col-span-1">
              <a href={mailto} className="relative self-start break-all text-[38px] font-extrabold tracking-[-.02em] text-ink no-underline max-md:text-[26px]">
                {contact.email}
                <svg className="absolute -bottom-3.5 left-0 h-[18px] w-full overflow-visible" viewBox="0 0 300 18" preserveAspectRatio="none" aria-hidden="true">
                  <path className="dr" style={{ "--len": "340" } as CSSProperties} d="M2 10 C 80 2, 160 18, 298 6" fill="none" stroke="#FF5BA7" strokeWidth="5" strokeLinecap="round" />
                </svg>
              </a>
              <p className="m-0 max-w-[420px] text-lg font-medium leading-[1.55]">{contact.note}</p>
              <div className="flex flex-wrap gap-2.5">
                {contact.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-magnetic
                    className="inline-flex min-h-12 items-center rounded-full bg-ink px-5 font-bold text-cream no-underline transition-colors hover:bg-pink hover:text-ink"
                  >
                    {s.label} ↗
                  </a>
                ))}
              </div>
            </div>
            <ContactForm types={contact.projectTypes} budgets={contact.budgets} />
          </div>

          <footer className="relative z-[2] mt-[90px] flex flex-wrap justify-between gap-4 border-t-2 border-ink pt-[22px] font-semibold">
            <span>{site.footer}</span>
            <span>{contact.socials.map((s) => s.label).join(" · ")}</span>
            <a href="#top" className="no-underline">
              Lên đầu trang ↑
            </a>
          </footer>
          <div
            aria-hidden="true"
            className="disp mt-[30px] whitespace-nowrap text-center !leading-[.8] text-[clamp(80px,17vw,260px)] text-transparent [-webkit-text-stroke:2px_rgba(14,14,19,.35)]"
          >
            {site.name}
          </div>
        </div>
      </section>
    </>
  );
}
