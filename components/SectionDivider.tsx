"use client";

import { motion } from "framer-motion";
import { SECTION_COLORS } from "@/components/sectionColors";

export default function SectionDivider({
  section = "about",
  flip = false,
  className = "",
}: {
  section?: "about" | "projects" | "timeline" | "skills"| "contact";
  flip?: boolean;
  className?: string;
}) {
  const c = SECTION_COLORS[section];
  const gradId = `dividerGradient-${section}`;

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      {/* ambient glow that matches the section */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-70 blur-3xl">
        <div
          className="mx-auto h-28 w-2/3 rounded-full"
          style={{ backgroundColor: c.a }}
        />
        <div
          className="mx-auto -mt-14 h-28 w-2/3 rounded-full"
          style={{ backgroundColor: c.b }}
        />
      </div>

      <motion.svg
        viewBox="0 0 1440 180"
        className={`block w-full ${flip ? "rotate-180" : ""}`}
        preserveAspectRatio="none"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={c.a} />
            <stop offset="55%" stopColor={c.b} />
            <stop offset="100%" stopColor={c.a} />
          </linearGradient>

          <filter id={`softGlow-${section}`} x="-20%" y="-50%" width="140%" height="200%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 0.65 0"
              result="glow"
            />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.path
          fill={`url(#${gradId})`}
          stroke="rgba(255,255,255,0.10)"
          strokeWidth="1"
          filter={`url(#softGlow-${section})`}
          initial={{ d: PATH_A }}
          animate={{ d: [PATH_A, PATH_B, PATH_A] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.path
          fill="transparent"
          stroke={c.line}
          strokeWidth="2"
          initial={{ d: LINE_A }}
          animate={{ d: [LINE_A, LINE_B, LINE_A] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.path
          fill="transparent"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1.5"
          initial={{ d: LINE2_A }}
          animate={{ d: [LINE2_A, LINE2_B, LINE2_A] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.svg>
    </div>
  );
}

const PATH_A =
  "M0,110 C160,70 320,145 480,125 C640,105 720,55 880,66 C1040,78 1200,135 1440,104 L1440,180 L0,180 Z";
const PATH_B =
  "M0,120 C190,155 360,48 520,78 C680,108 760,155 920,132 C1080,110 1220,55 1440,116 L1440,180 L0,180 Z";

const LINE_A =
  "M0,110 C160,70 320,145 480,125 C640,105 720,55 880,66 C1040,78 1200,135 1440,104";
const LINE_B =
  "M0,120 C190,155 360,48 520,78 C680,108 760,155 920,132 C1080,110 1220,55 1440,116";

const LINE2_A =
  "M0,126 C180,92 350,150 520,138 C690,126 780,80 940,90 C1100,100 1240,146 1440,122";
const LINE2_B =
  "M0,132 C210,160 360,70 540,94 C720,118 820,160 980,142 C1140,124 1260,70 1440,128";