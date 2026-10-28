import { site } from "@/lib/content";

const base =
  "min-h-11 items-center whitespace-nowrap rounded-full px-4 text-[15px] font-semibold no-underline transition-colors";
const link = `inline-flex ${base}`;

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav
        aria-label="Điều hướng chính"
        className="flex items-center gap-1.5 rounded-full border border-cream/12 bg-card/82 p-1.5 backdrop-blur-md"
      >
        <a href="#top" className={`${link} bg-lime font-extrabold text-ink`}>
          {site.logo}
        </a>
        {[
          ["#works", "Works"],
          ["#services", "Services"],
          ["#about", "About"],
        ].map(([href, label]) => (
          <a key={href} href={href} className={`${base} hidden hover:bg-cream/10 md:inline-flex`}>
            {label}
          </a>
        ))}
        <a href="#contact" className={`${link} bg-pink text-ink hover:bg-cream`}>
          Say hi!
        </a>
      </nav>
    </header>
  );
}
