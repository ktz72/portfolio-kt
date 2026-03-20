"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function StickyProjectsIntro({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <section className="relative">
      <div className="grid gap-10 lg:grid-cols-[320px_minmax(0,1fr)] lg:gap-14">
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4"
          >
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-slate-500">
              Selected Work
            </p>

            <h2 className="font-display text-3xl font-semibold leading-tight tracking-[-0.03em] text-white md:text-4xl">
              Projects that reflect how I work with spatial data.
            </h2>

            <p className="max-w-sm text-sm leading-7 text-slate-400">
              A selection of geospatial projects spanning GIS, remote sensing,
              environmental analysis, and spatial storytelling.
            </p>
          </motion.div>
        </div>

        <div>{children}</div>
      </div>
    </section>
  );
}