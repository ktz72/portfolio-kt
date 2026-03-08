"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { SECTION_COLORS } from "@/components/sectionColors";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 30,
    mass: 0.2,
  });

  const [color, setColor] = useState(SECTION_COLORS.about.bar);

  useEffect(() => {
    const ids = ["about", "projects", "timeline", "skills","contact"];

    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;

        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;

        if (scrollPos >= top && scrollPos < bottom) {
          setColor(SECTION_COLORS[id].bar);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed left-0 top-0 z-[999] h-[3px] w-full origin-left shadow-[0_0_20px_rgba(0,0,0,0.35)]"
      style={{ scaleX, backgroundColor: color }}
    />
  );
}