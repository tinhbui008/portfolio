import type { CSSProperties } from "react";
import { site } from "@/lib/content";
import { Star } from "@/components/ui/Arrow";
import { ContactForm } from "./ContactForm";

const TALK = ["L", "e", "t", "’", "s", " ", "t", "a", "l", "k", "!"];

export function Contact() {
  const { contact } = site;
  const mailto = `mailto:${contact.email}`;
  return (
    <section
      id="contact"
      className="relative overflow-hidden rounded-t-[48px] bg-lime pb-10 pt-[120px] text-ink max-md:rounded-t-[28px]"
    >
      <div className="float spin" data-speed="0.15" style={{ left: "4%", top: 60 }}>
        <Star size={110} fill="#0E0E13" />
      </div>
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
              className={`inline-block transition-[transform,color] duration-500 [transition-timing-function:var(--ease-bounce)] ${
                i % 2
                  ? "group-hover:translate-y-[8%] group-hover:rotate-[5deg]"
                  : "group-hover:-translate-y-[14%] group-hover:-rotate-6 group-hover:text-pink"
              }`}
            >
              {ch}
            </span>
          ))}
        </a>

        <div className="mt-16 grid grid-cols-12 gap-6 max-md:grid-cols-1">
          <div className="rv col-span-5 flex flex-col gap-[26px] max-md:col-span-1">
            <a href={mailto} className="break-all text-[38px] font-extrabold tracking-[-.02em] text-ink max-md:text-[26px]">
              {contact.email}
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

        <footer className="mt-[100px] flex flex-wrap justify-between gap-4 border-t-2 border-ink pt-[22px] font-semibold">
          <span>{site.footer}</span>
          <span>{contact.socials.map((s) => s.label).join(" · ")}</span>
          <a href="#top" className="no-underline">
            Lên đầu trang ↑
          </a>
        </footer>
      </div>
    </section>
  );
}
