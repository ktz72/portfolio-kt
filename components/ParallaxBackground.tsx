"use client";

import { useEffect, useState } from "react";

export default function ParallaxBackground() {
  const [pos, setPos] = useState({ x: 50, y: 15 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setPos({ x, y });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div
        className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-violet-600/20 blur-3xl transition-transform duration-200"
        style={{ transform: `translate(${(pos.x - 50) * 1.2}px, ${(pos.y - 15) * 1.2}px)` }}
      />
      <div
        className="absolute -right-40 top-10 h-[520px] w-[520px] rounded-full bg-emerald-500/15 blur-3xl transition-transform duration-200"
        style={{ transform: `translate(${(50 - pos.x) * 1.1}px, ${(pos.y - 15) * 1.1}px)` }}
      />

      {/* faint grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:64px_64px] opacity-[0.06]" />
    </div>
  );
}