"use client";

import { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import { LayoutGroup, motion, number } from "framer-motion";

type Project = {
  title: string;
  desc: string;
  tags: string[];
  image: string;
  links: { read: string; github: string };
  details: string[];
  tools:string[];
  dataset:string[];
  workflow?:string[];
};

const projects: Project[] = [
  {
    title: "NDVI Change Detection — Atlanta",
    desc: "Compared NDVI patterns and validated interpretations with land cover context.",
    tags: ["Remote Sensing", "Python"],
    image: "/projects/Soil%20Map.jpg",
    links: { read: "#", github: "#" },
    details: [
      "Processed imagery and computed NDVI layers.",
      "Compared seasonal patterns across multiple dates.",
      "Validated interpretations using land cover context.",
    ],
    tools:[],
    dataset:[],
    workflow:[],
  },
  {
    title: "Routing & Barriers Map",
    desc: "Built route optimization with barriers and a clean final map.",
    tags: ["ArcGIS Pro", "Network Analysis"],
    image: "/projects/Shortest%20Path.jpg",
    links: { read: "#", github: "#" },
    details: [
      "Created a network dataset and solved shortest paths.",
      "Added barriers and evaluated route changes.",
      "Designed a final map layout with clean symbology.",
    ],
    tools:[],
    dataset:[],
    workflow:[],
  },
  {
    title: "Wildfire Distribution Fitting",
    desc: "Fit probability distributions to fire magnitude data and interpreted model fit.",
    tags: ["Risk", "Statistics"],
    image: "/projects/Population%20Density.jpg",
    links: { read: "#", github: "#" },
    details: [
      "Cleaned historical fire perimeter data.",
      "Fit candidate distributions and compared goodness-of-fit.",
      "Interpreted results and documented assumptions.",
    ],
    tools:[],
    dataset:[],
    workflow:[],
  },
];

export default function Projects() {
  const [active, setActive] = useState<Project | null>(null);
  const[origin,setOrigin] =useState<{x:number,y:number} |null>(null);

  // Close with Escape
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <LayoutGroup>
      <div className="grid gap-4 md:grid-cols-3">
        {projects.map((p) => {
          const imageId = `project-image-${p.title}`;
          const titleId = `project-title-${p.title}`;

          return (
            <article
              key={p.title}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10"
              onClick={(e) => {
                setOrigin({x:e.clientX,y:e.clientY});
                setActive(p);
              }}
            >
              {/* Glow */}
              <div className="pointer-events-none absolute inset-0 -z-10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100">
                <div className="h-full w-full rounded-2xl bg-violet-500/10" />
              </div>

              {/* Shared-element image */}
              <div className="mb-4 overflow-hidden rounded-xl border border-white/10 bg-black/20">
                <motion.img
                  layoutId={imageId}
                  src={p.image}
                  alt={p.title}
                  className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  transition={{ type: "spring", stiffness: 320, damping: 30 }}
                />
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-slate-300"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Shared-element title (optional but looks great) */}
              <motion.h3
                layoutId={titleId}
                className="mt-4 text-lg font-semibold"
                transition={{ type: "spring", stiffness: 320, damping: 30 }}
              >
                {p.title}
              </motion.h3>

              <p className="mt-2 text-sm text-slate-300">{p.desc}</p>

              <div className="mt-4 text-sm text-slate-400">
                Click to view details →
              </div>
            </article>
          );
        })}
      </div>

      <Modal open={!!active}
      origin={origin}
      onClose={()=>{
        setActive(null);
        setOrigin(null);
      }}>
        {active ? (
          <ModalContent project={active} />
        ) : null}
      </Modal>
    </LayoutGroup>
  );
}

function ModalContent({ project }: { project: Project }) {
  const imageId = `project-image-${project.title}`;
  const titleId = `project-title-${project.title}`;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Shared-element image (same layoutId as the card) */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/20">
        <motion.img
          layoutId={imageId}
          src={project.image}
          alt={project.title}
          className="h-72 w-full object-cover md:h-full"
          transition={{ type: "spring", stiffness: 320, damping: 30 }}
        />
      </div>

      <div>
        {/* Shared-element title (same layoutId as the card title) */}
        <motion.h3
          layoutId={titleId}
          className="text-2xl font-bold"
          transition={{ type: "spring", stiffness: 320, damping: 30 }}
        >
          {project.title}
        </motion.h3>

        <p className="mt-2 text-slate-300">{project.desc}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300"
            >
              {t}
            </span>
          ))}
        </div>
        <div className="mt-5">
          <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
            Tools Used
          </h4>
          <div className="mt-2 flex flex-wrap gap-2">
            {project.tools.map((tool)=>(
              <span key={tool}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                {tool}
              </span>
            ))}
          </div>
        </div>
        


        <ul className="mt-5 list-disc space-y-2 pl-5 text-slate-300">
          {project.details.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>

        <div className="mt-6 flex gap-3">
          <a
            href={project.links.read}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold hover:bg-white/10"
          >
            Read
          </a>
          <a
            href={project.links.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-500"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}