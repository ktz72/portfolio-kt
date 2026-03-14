"use client";

import { AnimatePresence, motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import Magnetic from "./Magnetic";

const rotatingWords = [
  "Keerthi Teja",
  "a GIS Student",
  "Spatial Storyteller",
  "Remote Sensing Enthusiast",
];

const GradientBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-slate-950">
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.03]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(139,92,246,0.18),transparent_30%),radial-gradient(circle_at_80%_30%,rgba(99,102,241,0.16),transparent_30%),linear-gradient(to_bottom,#020617,#020617,#081235)]" />

      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          x: [0, 160, 0],
          y: [0, 100, 0],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-24 top-0 h-[420px] w-[420px] rounded-full bg-violet-500/20 blur-[80px]"
      />

      <motion.div
        animate={{
          scale: [1, 1.18, 1],
          x: [0, -150, 0],
          y: [0, 100, 0],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[-120px] top-1/4 h-[520px] w-[520px] rounded-full bg-indigo-500/20 blur-[80px]"
      />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:96px_96px] [mask-image:radial-gradient(circle_at_center,black,transparent_80%)]" />
    </div>
  );
};

export default function Opener() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2200);

    return () => clearInterval(id);
  }, []);

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.14,
        delayChildren: 0.2,
      },
    },
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 24, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.85,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const lineReveal: Variants = {
    hidden: { opacity: 0, scaleX: 0, transformOrigin: "left" },
    visible: {
      opacity: 1,
      scaleX: 1,
      transition: {
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-24 text-center">
      <GradientBackground />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center"
      >
        <motion.p
          variants={fadeUp}
          className="mb-5 text-xs font-semibold uppercase tracking-[0.45em] text-slate-500 sm:text-sm"
        >
          Hey, I’m
        </motion.p>

        <div className="relative flex min-h-[180px] items-center justify-center sm:min-h-[220px] md:min-h-[260px]">
          <AnimatePresence mode="popLayout">
            <motion.h1
              key={rotatingWords[index]}
              initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -40, filter: "blur(12px)" }}
              transition={{
                duration: 0.75,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-semibold text-5xl tracking-[-0.06em] text-white sm:text-7xl md:text-8xl lg:text-[8.5rem]"
            >
              {rotatingWords[index]}
            </motion.h1>
          </AnimatePresence>
        </div>

        <motion.h2
          variants={fadeUp}
          className="mt-2 text-4xl font-light italic tracking-[-0.05em] text-slate-400 sm:text-6xl md:text-7xl lg:text-[6rem]"
        >
          
        </motion.h2>

        <motion.div
          variants={lineReveal}
          className="mt-8 h-px w-24 bg-gradient-to-r from-transparent via-violet-400 to-transparent"
        />

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-8 max-w-3xl text-base  leading-8 text-slate-400 sm:text-lg md:text-xl"
        >
          Using{" "}
          <span className="font-medium text-white">
            GIS, remote sensing, and spatial data science
          </span>{" "}
          to turn complex geospatial datasets into clear, decision-ready
          insights and meaningful digital experiences.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Magnetic>
          <a
            href="#projects"
            className="rounded-full border border-white/10 bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(255,255,255,0.12)]"
          >
            View Projects
          </a>
          </Magnetic>

          
          <a
            href="#about"
            className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:border-violet-400/40 hover:bg-white/10"
          >
            About Me
          </a>
        </motion.div>

        <motion.div variants={fadeUp} className="mt-20 flex justify-center">
          <a
            href="#about"
            className="group flex flex-col items-center gap-4 text-[10px] font-bold uppercase tracking-[0.35em] text-slate-500 transition hover:text-white"
          >
            <span>Scroll</span>
            <div className="flex h-14 w-8 items-start justify-center rounded-full border border-white/10 bg-white/5 p-2 backdrop-blur-sm">
              <motion.div
                animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.8,
                  ease: "easeInOut",
                }}
                className="h-2.5 w-px bg-gradient-to-b from-violet-400 via-violet-500 to-transparent"
              />
            </div>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}