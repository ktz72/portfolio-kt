"use client";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <header className="fixed top-6 left-0 right-0 z-[100] px-4">
      <nav className="mx-auto flex max-w-4xl items-center justify-between rounded-full border border-white/10 bg-white/5 p-2 backdrop-blur-md shadow-2xl">
        {/* Left Side: Profile Badge */}
        <div className="flex items-center gap-3 rounded-full bg-white/5 py-1 pl-1 pr-4 border border-white/5">
          <div className="relative h-8 w-8 overflow-hidden rounded-full border border-white/20 bg-slate-800">
             {/* Replace with your actual headshot path */}
            <img 
              src="/KT.jpg" 
              alt="Keerthi Teja" 
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-bold leading-none text-white">Keerthi Teja M</span>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[9px] uppercase tracking-wider text-slate-400">Available for hire</span>
            </div>
          </div>
        </div>

        {/* Center: Navigation Links */}
        <div className="hidden items-center gap-6 md:flex">
          {["About", "Timeline", "Projects"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-[11px] font-medium uppercase tracking-widest text-slate-400 transition hover:text-white"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Right Side: Contact Button */}
        <a
          href="#contact"
          className="rounded-full bg-emerald-400 px-6 py-2.5 text-[11px] font-bold uppercase tracking-widest text-slate-950 transition hover:bg-emerald-300"
        >
          Contact
        </a>
      </nav>
    </header>
  );
}