"use client";
import { motion, Variants } from "framer-motion";

const GradientBackground = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-slate-950">
      {/* 1. The Noise Overlay from your CSS */}
      <div className="bg-noise absolute inset-0 opacity-[0.03] pointer-events-none" />

      {/* 2. Animated Blobs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -left-20 -top-20 h-[500px] w-[500px] rounded-full bg-violet-600/20 blur-[120px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -80, 0],
          y: [0, 120, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute -right-20 top-1/4 h-[600px] w-[600px] rounded-full bg-indigo-600/15 blur-[140px]"
      />
    </div>
  );
};

export default function Opener() {
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    }
  };

  const item: Variants = {
    hidden: { y: 40, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 text-center">
      <GradientBackground />
      
      <motion.div 
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-5xl"
      >
        <motion.div variants={item} className="mb-2">
          <span className="text-xs font-bold uppercase tracking-[0.4em] text-slate-500">
            Portfolio 2026
          </span>
        </motion.div>

        <motion.h1 
          variants={item}
          className="text-5xl font-medium tracking-tight text-white sm:text-7xl md:text-8xl lg:text-9xl"
        >
          Keerthi <span className="text-slate-500 italic font-light">Teja</span>
        </motion.h1>

        <motion.div variants={item} className="mx-auto mt-8 max-w-2xl">
          <p className="text-lg font-light leading-relaxed text-slate-400 md:text-xl">
            Geospatial Data Scientist. Turning complex spatial datasets into 
            <span className="text-white font-normal"> meaningful narratives.</span>
          </p>
        </motion.div>

        <motion.div variants={item} className="mt-16 flex justify-center">
          <a 
            href="#about"
            className="group flex flex-col items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 transition hover:text-white"
          >
            <span>Explore Work</span>
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="h-10 w-[1px] bg-gradient-to-b from-violet-500 to-transparent"
            />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}