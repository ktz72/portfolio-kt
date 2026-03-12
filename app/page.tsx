'use client';
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Section from "@/components/Section";
import Projects from "@/components/Projects";
import Timeline from "@/components/Timeline";
import Contact from "@/components/Contact";
import { FadeIn } from "@/components/Motion";
import ParallaxBackground from "@/components/ParallaxBackground";
import ScrollProgress from "@/components/ScrollProgress";
import SectionDivider from "@/components/SectionDivider";
import GlobeMapBackground from "@/components/GlobeMapBackground";
import GlobeCityTooltips from "@/components/GlobeCityTooltips";
import Skills from "@/components/Skills";
import Opener from "@/components/Opener";

export default function Home() {
  const [showTechnicalElements, setShowTechnicalElements] = useState(false);

  useEffect(() => {
    const aboutSection = document.getElementById("about");
    if (!aboutSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // This is the trigger: when the 'About' section moves toward the top,
        // we show the Navbar, Globe, and other technical UI.
        setShowTechnicalElements(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { threshold: 0.1 }
    );
    
    observer.observe(aboutSection);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-slate-950 text-slate-100 selection:bg-violet-500/30">
      <div className="fixed top-0 left-0 right-0 z-[100]">
          <Navbar />
          <ScrollProgress />
        </div>
      
      {/* 1. CINEMATIC OPENER 
          Pure and distraction-free. No Navbar here. */}
      <div className="relative z-20">
        <Opener />
      </div>

      {/* 2. THE REVEAL CONTAINER 
          Everything in here (Navbar, Globe, Tooltips) is hidden initially 
          and fades in together after you scroll past the Opener. */}
      <div 
        className={`transition-opacity duration-1000 ease-in-out ${
          showTechnicalElements ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Navbar is now part of the fade-in group at the highest z-index */}
        

        {/* Globe and Parallax stay in the background */}
        <div className="fixed inset-0 z-0 opacity-70">
          <GlobeMapBackground />
          <ParallaxBackground />
        </div>

        {/* Interactive map tooltips */}
        <div className="relative z-30">
          <GlobeCityTooltips />
        </div>
      </div>

      {/* 3. MAIN CONTENT 
          Slides over the globe but stays under the fixed Navbar. */}
      <main className="relative z-10 mx-auto w-full max-w-6xl px-4">
        
        <Section id="about" title="About" subtitle="Geospatial Data Scientist">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
              <h3 className="text-lg font-semibold text-violet-400">What I do</h3>
              <p className="mt-2 text-slate-300">
                I work on geospatial analysis projects—turning spatial data into insights using GIS, 
                remote sensing, and Python.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
              <h3 className="text-lg font-semibold text-emerald-400">What I’m looking for</h3>
              <p className="mt-2 text-slate-300">
                Internships or research roles in geospatial data science, environmental analytics, and mapping products.
              </p>
            </div>
          </div>
        </Section>

        <SectionDivider section="about" className="my-10" />
        <FadeIn><section id="projects"><Projects /></section></FadeIn>
        <SectionDivider section="projects" flip className="my-20" />
        <FadeIn delay={0.1}><Section id="timeline" title="Timeline"><Timeline /></Section></FadeIn>
        <SectionDivider section="timeline" className="my-20" />
        <FadeIn delay={0.2}><Section id="skills" title="Skills"><Skills /></Section></FadeIn>
        <SectionDivider section="skills" flip className="my-20" />
        <FadeIn delay={0.2}><Section id="contact" title="Contact"><Contact /></Section></FadeIn>

        <footer className="py-20 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Keerthi Teja M</p>
          <p className="mt-2 text-[10px] uppercase tracking-[0.2em] opacity-40">Atlanta, GA • Georgia Tech</p>
        </footer>
      </main>
    </div>
  );
}