import siteJson from "@/content/site.json";
import projectsJson from "@/content/projects.json";
import servicesJson from "@/content/services.json";
import testimonialsJson from "@/content/testimonials.json";

export type Swatch = "lime" | "pink" | "orange" | "blue" | "yellow" | "violet" | "cream";
/** Washi tape colour on cards / stickers. */
export type Tape = "yellow" | "pink" | "lime";
export type ArtKind =
  | "sun" | "grid" | "arch" | "stripes" | "blob" | "dots" | "flower" | "sketch" | "letter"
  | "riso" | "op" | "moon" | "halftone";
export type CellSize = "big" | "wide" | "tall" | "sq";

export interface ArtSpec {
  art: ArtKind;
  bg: string;
  fg: string;
  /** Secondary colour for two-tone arts (sets --c2). */
  c2?: string;
  glyph?: string;
}

export interface Work extends ArtSpec {
  id: string;
  title: string;
  category: string;
  size: CellSize;
  /** Resting tilt in degrees. */
  rot: number;
  tape: Tape;
  /** Optional real image in /public, e.g. "/works/p1.webp". Replaces the placeholder art. */
  image?: string;
}

export interface Featured extends ArtSpec {
  id: string;
  title: string;
  label: string;
  pin: Swatch;
  rot: number;
  width: number;
  height: number;
  image?: string;
}

export interface Category { id: string; label: string }

export interface CaseStep { title: string; body: string; color: Swatch; tape: Tape; rot: number; sketch?: boolean }

export interface Service { title: string; body: string; color: Swatch; icon: "star" | "leaf" | "poster" | "box" }

export interface Testimonial {
  quote: string; name: string; role: string; color: Swatch; tape: Tape; rotate: number; offset?: boolean;
}

export const site = siteJson;
export const categories = projectsJson.categories as Category[];
export const works = projectsJson.works as Work[];
export const featured = projectsJson.featured as Featured[];
export const caseStudy = projectsJson.caseStudy as {
  title: string; titleAccent: string; summary: string; hero: ArtSpec; steps: CaseStep[];
};
export const services = servicesJson as Service[];
export const testimonials = testimonialsJson as Testimonial[];

export const swatch = (c: Swatch | string) => `var(--color-${c})`;
