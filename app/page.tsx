import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import Projects from "@/components/Projects";
import Timeline from "@/components/Timeline";
import Contact from "@/components/Contact";
import { FadeIn } from "@/components/Motion";
import ParallaxBackground from "@/components/ParallaxBackground";
import ScrollProgress from "@/components/ScrollProgress";
import SectionDivider from "@/components/SectionDivider";
import GlobeMapBackground from "@/components/GlobeMapBackgorund";
import GlobeCityTooltips from "@/components/GlobeCityTooltips";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <GlobeMapBackground />
      {/* Background glow (purely visual) */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-[-10%] top-[-10%] h-[420px] w-[420px] rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute right-[-10%] top-[5%] h-[420px] w-[420px] rounded-full bg-emerald-500/15 blur-3xl" />
      </div>
      <GlobeCityTooltips />
      <ScrollProgress />
      <ParallaxBackground />

      <Navbar />

      <main className="realtive z-10 mx-auto w-full max-w-6xl px-4">
        <Hero />

        <Section id="about" title="About" subtitle="Short, skimmable, and clear.">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg font-semibold">What I do</h3>
              <p className="mt-2 text-slate-300">
                I work on geospatial analysis projects—turning spatial data into insights using GIS,
                remote sensing, and Python.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg font-semibold">What I’m looking for</h3>
              <p className="mt-2 text-slate-300">
                Internships / research roles in geospatial data science, environmental analytics, and mapping products.
              </p>
            </div>
          </div>
        </Section>
        <SectionDivider section="about" className="my-10" />
        <FadeIn>
          <section id="projects" title="Projects">
            <Projects />
          </section>
        </FadeIn>
        <SectionDivider section="projects" flip className="my-10" />
        <FadeIn delay={0.1}>
          <Section id="timeline" title="Timeline">
            <Timeline />
          </Section>
        </FadeIn>
        <SectionDivider section="timeline" className="my-10" />
        <FadeIn delay={0.2}>
          <Section id="contact" title="Contact">
            <Contact />
          </Section>
        </FadeIn>
        <SectionDivider section="contact" flip className="my-10" />

        <footer className="py-10 text-center text-sm text-slate-400">
          © {new Date().getFullYear()} Your Name
        </footer>
      </main>
    </div>
  );
}