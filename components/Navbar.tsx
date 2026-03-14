"use client";
import { motion } from "framer-motion";
import Magnetic from "./Magnetic";

export default function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -24, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-0 right-0 top-6 z-[100] px-4"
    >
      <nav className="mx-auto flex max-w-4xl items-center justify-between rounded-full border border-white/8 bg-white/[0.04] p-2 backdrop-blur-lg shadow-[0_8px_40px_rgba(0,0,0,0.28)]">
        {/* Left Side: Profile Badge */}
        <div className="flex items-center gap-3 rounded-full border border-white/6 bg-white/[0.03] py-1 pl-1 pr-4">
          <div className="relative h-8 w-8 overflow-hidden rounded-full border border-white/15 bg-slate-800"
          >
            <img
              src="/KT.jpg"
              alt="Keerthi Teja"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col">
            <span className="text-[11px] font-bold leading-none text-white">
              Keerthi Teja M
            </span>

            <div className="mt-1 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[9px] uppercase tracking-wider text-slate-400">
                Available for hire
              </span>
            </div>
          </div>
        </div>

        {/* Center: Navigation Links */}
        <div className="hidden items-center gap-8 md:flex">
          {["About", "Timeline", "Projects"].map((item) => (
            <Magnetic key={item}>
            <a       
              href={`#${item.toLowerCase()}`}
              className="text-[11px] font-medium uppercase tracking-[0.22em] text-slate-400 transition duration-300 hover:text-white"
            >
              {item}
            </a>
            </Magnetic>
          ))}
        </div>
        {/* Right Side: Contact Button */}
        <Magnetic>   
        <a
          href="#contact"
          className="rounded-full bg-emerald-400 px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.22em] text-slate-950 transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-300 hover:shadow-[0_0_24px_rgba(52,211,153,0.28)]"
        >
          Get in touch
        </a>
        </Magnetic>
      </nav>
    </motion.header>
  );
}