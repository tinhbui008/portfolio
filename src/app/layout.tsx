import type { Metadata, Viewport } from "next";
import "./fonts.css";
import "./globals.css";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: `${site.name} — ${site.role}`,
  description: `${site.positioning.before} ${site.positioning.highlight}. ${site.positioning.sub}`,
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: site.positioning.sub,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0E0E13",
  colorScheme: "dark",
};

/**
 * Runs before first paint: mark that JS-driven reveals will run, so .rv / .mask
 * start hidden without a flash. Skipped under reduced motion (content stays visible).
 */
const bootScript = `if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('js')`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <link rel="preload" href="/fonts/bricolage-grotesque-latin-standard-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/bricolage-grotesque-vietnamese-standard-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/caveat-latin-700-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
