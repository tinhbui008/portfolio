import { categories, works } from "@/lib/content";
import { Loader } from "@/components/sections/Loader";
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Works } from "@/components/sections/Works";
import { Featured } from "@/components/sections/Featured";
import { CaseStudy } from "@/components/sections/CaseStudy";
import { Services } from "@/components/sections/Services";
import { About } from "@/components/sections/About";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { Motion } from "@/components/motion/Motion";

export default function Home() {
  return (
    <>
      <div className="grain" aria-hidden="true" />
      <Loader />
      <Nav />
      <main className="relative overflow-x-clip">
        <Hero />
        <Marquee />
        <Works works={works} categories={categories} />
        <Featured />
        <CaseStudy />
        <Services />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Motion />
    </>
  );
}
