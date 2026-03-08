"use client";

import { motion } from "framer-motion";

const skillGroups = [
  {
    category: "GIS & Spatial Analysis",
    subtitle: "Core geospatial workflow and problem-solving",
    bars: [
      { name: "ArcGIS Pro", level: 90 },
      { name: "Spatial Analysis", level: 88 },
      { name: "Cartography", level: 84 },
    ],
    chips: ["Network Analysis", "Raster Analysis", "Suitability Modeling", "Geoprocessing"],
  },
  {
    category: "Remote Sensing",
    subtitle: "Image interpretation, indices, and land-cover workflows",
    bars: [
      { name: "Remote Sensing", level: 86 },
      { name: "Image Classification", level: 80 },
      { name: "Change Detection", level: 82 },
    ],
    chips: ["NDVI", "Land Cover", "Image Processing", "Multispectral Analysis"],
  },
  {
    category: "Programming & Data",
    subtitle: "Coding, statistics, and reproducible analysis",
    bars: [
      { name: "Python", level: 82 },
      { name: "Machine Learning", level: 70 },
      { name: "Statistics", level: 78 },
    ],
    chips: ["Pandas", "NumPy", "Risk Modeling", "Data Visualization"],
  },
];

export default function Skills() {
  return (
    <div className="space-y-6">
      {skillGroups.map((group) => (
        <div
          key={group.category}
          className="grid gap-5 rounded-3xl border border-white/10 bg-white/5 p-6 md:grid-cols-[0.9fr_1.1fr]"
        >
          <div>
            <h3 className="text-xl font-semibold text-white">{group.category}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">{group.subtitle}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {group.chips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-slate-300"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {group.bars.map((skill) => (
              <div key={skill.name}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-200">{skill.name}</span>
                  <span className="text-sm text-slate-400">{skill.level}%</span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-violet-500"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}