"use client";

import { useEffect, useMemo, useState } from "react";
import Modal from "@/components/Modal";
import { LayoutGroup, motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const ZoomMap = dynamic(() => import("@/components/ZoomMap"), { ssr: false });

type Project = {
  title: string;
  desc: string;
  tags: string[];
  image: string;
  links: { read: string; github: string };
  details: string[];
  tools: string[];
  dataset: string[];
  workflow?: string[];
  report?: string;
  visuals?: {
    tab: string;
    image: string;
    caption: string;
    type: "map" | "image" | "html-img";
  }[];
  mapdata?: {
    center: [number, number];
    zoom?: number;
    points: {
      name: string;
      lat: number;
      lng: number;
      value: number;
      color?: string;
    }[];
  };
};

type ProjectProps = {
  activeProject: Project | null;
  setActiveProject: React.Dispatch<React.SetStateAction<Project | null>>;
};

const projects: Project[] = [
  {
    title: "Electricity Sector CO₂ Emissions Analysis — Georgia vs U.S. States",
    desc: "Analyzed electricity-sector CO₂ emissions in Georgia and compared them with Tennessee, Texas, California, and the U.S. using EIA State Energy Data System data. Built fuel-mix visualizations, emissions trends, and spatial maps using R.",
    tags: ["R Programming", "GIS", "Energy Data", "CO₂ Analysis", "Data Visualization"],
    image: "/projects/CCA/CO2_Map.png",
    links: { read: "/Reports/CCAProject_KeerthiTeja.pdf", github: "#" },
    details: [
      "Used EIA State Energy Data System data to compare electricity fuel mix and emissions.",
      "Estimated emissions by applying fuel-specific CO₂ coefficients to electric-sector fuel input.",
      "Built fuel mix charts, trend plots, per-capita comparisons, and state-level maps in R.",
    ],
    tools: ["R-Studio", "tmap", "ggplot"],
    dataset: ["US EIA State Energy Data System (SEDS)."],
    workflow: [
      "Filtered SEDS data for GA, TN, TX, CA, and the U.S.",
      "Calculated fuel shares for electricity generation.",
      "Estimated total and per-capita CO₂ emissions using fuel-specific coefficients.",
      "Visualized trends and mapped 2023 emissions for comparison.",
    ],
    report: "/Reports/CCAProject_KeerthiTeja.pdf",
    visuals: [
      {
        tab: "Map",
        image: "/projects/CCA/CO2_map.html",
        caption:
          "State-level electricity-sector CO₂ emissions in 2023 for Georgia, Tennessee, Texas, and California.",
        type: "html-img",
      },
      {
        tab: "Fuel-Mix",
        image: "/projects/CCA/Fuel plot-2023.png",
        caption:
          "Comparison of fuel mix across states, highlighting differences in coal, gas, nuclear, and renewables.",
        type: "image",
      },
      {
        tab: "Per-Capita Trend",
        image: "/projects/CCA/Per_capita.png",
        caption: "Per-capita electricity-sector emissions comparison across the selected states.",
        type: "image",
      },
      {
        tab: "State-wise Emissions",
        image: "/projects/CCA/2023_emissions.png",
        caption:
          "Electricity-sector CO₂ emissions for selected states in 2023, shows Texas as the largest emitter while Georgia, California, and Tennessee contribute substantially lower levels",
        type: "image",
      },
    ],
  },
  {
    title: "DInSAR based Land Subsidence Analysis for Visakhapatnam",
    desc: "Analyzed Land Subsidence in Visakhapatnam, AP, India using Sentinel-1 SAR imagery and Differential InSAR techniques. Generated displacement maps to study surface deformation associated with urban and environmental risk factors.",
    tags: [
      "GIS",
      "Microwave Remote Sensing",
      "Synthetic Aperture RADAR",
      "Differential-Interferometry",
    ],
    image: "/projects/LS/LS-GE.png",
    links: { read: "#", github: "#" },
    details: [
      "Developed an end-to-end DInSAR workflow to detect and visualize land subsidence in Visakhapatnam using Sentinel-1A SAR data.",
      "Used methods including co-registration, interferogram formation, differential interferometry, phase unwrapping, and displacement mapping to process SAR data.",
      "Used software packages like ESA SNAP and its library SNAPHU for interferometric processing, then exported the results for visualization in ArcGIS and Google Earth.",
      "Produced displacement maps to support interpretation of surface deformation in a coastal urban environment vulnerable to flooding and infrastructure stress.",
    ],
    tools: ["ESA SNAP", "ArcGIS", "QGIS", "Google Earth"],
    dataset: [],
    workflow: [],
  },
    {
    title: "Flood Risk Analysis & Suitability Mapping for Srikakulam",
    desc: "Developed a flood risk assessment model for Srikakulam district by integrating terrain, rainfall, land-cover, and hydrological factors to identify high-risk flood zones.",
    tags: ["GIS", "Remote Sensing", "Flood Modeling", "Spatial Analysis"],
    image: "/projects/FRM/FRM_map.jpg",
    links: { read: "#", github: "#" },
    details: [
      "Analyzed flood susceptibility in Srikakulam district, AP(IND) using multiple spatial factors.",
      "Integrated terrain, rainfall, and land cover datasets to model flood risk.",
      "Generated flood risk zones to support disaster management planning.",
    ],
    tools: ["ArcMAP", "QGIS"],
    dataset: ["ASTER DEM", "Sentinel-2 satellite imagery", "CRU precipitation data"],
    workflow: [
      "Derived slope and topographic wetness index from DEM.",
      "Computed flow direction and flow accumulation.",
      "Calculated drainage density.",
      "Integrated rainfall and land-cover datasets.",
      "Performed raster reclassification and overlay analysis to generate flood risk zones.",
    ],
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
    tools: [],
    dataset: [],
    workflow: [],
  },

];

export default function Projects({
  activeProject,
  setActiveProject,
}: ProjectProps) {
  const [origin, setOrigin] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveProject(null);
        setOrigin(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [setActiveProject]);

  return (
    <LayoutGroup>
      <ProjectsSlider
        projects={projects}
        setActiveProject={setActiveProject}
        setOrigin={setOrigin}
      />

      <Modal
        open={!!activeProject}
        origin={origin}
        onClose={() => {
          setActiveProject(null);
          setOrigin(null);
        }}
      >
        {activeProject ? <ModalContent project={activeProject} /> : null}
      </Modal>
    </LayoutGroup>
  );
}

function ProjectsSlider({
  projects,
  setActiveProject,
  setOrigin,
}: {
  projects: Project[];
  setActiveProject: React.Dispatch<React.SetStateAction<Project | null>>;
  setOrigin: React.Dispatch<React.SetStateAction<{ x: number; y: number } | null>>;
}) {
  const [page, setPage] = useState(0);

  const cardsPerPage = 3;

  const projectPages = useMemo(() => {
    const pages: Project[][] = [];
    for (let i = 0; i < projects.length; i += cardsPerPage) {
      pages.push(projects.slice(i, i + cardsPerPage));
    }
    return pages;
  }, [projects]);

  const maxPage = Math.max(0, projectPages.length - 1);

  const prev = () => setPage((p) => Math.max(0, p - 1));
  const next = () => setPage((p) => Math.min(maxPage, p + 1));

  return (
    <div className="relative">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-500">
            Academic Work
          </p>
          <p className="mt-2 text-sm text-slate-400">
            Browse through projects using the arrows.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={prev}
            disabled={page === 0}
            aria-label="Previous projects"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
          >
            ←
          </button>

          <button
            onClick={next}
            disabled={page === maxPage}
            aria-label="Next projects"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
          >
            →
          </button>
        </div>
      </div>

      <div className="overflow-hidden">
        <motion.div
          animate={{ x: `-${page *( 100/projectPages.length)}%` }}
          transition={{ type: "spring", stiffness: 220, damping: 28 }}
          className="flex"
          style={{ width: `${projectPages.length * 100}%` }}
        >
          {projectPages.map((pageProjects, pageIndex) => (
            <div
              key={pageIndex}
              className="grid shrink-0 grid-cols-3 gap-5"
              style={{ width: `${100 / projectPages.length}%` }}
            >
              {pageProjects.map((p) => {
                const imageId = `project-image-${p.title}`;
                const titleId = `project-title-${p.title}`;

                return (
                  <article
                    key={p.title}
                    className="group relative h-full cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10"
                    onClick={(e) => {
                      setOrigin({ x: e.clientX, y: e.clientY });
                      setActiveProject(p);
                    }}
                  >
                    <div className="pointer-events-none absolute inset-0 -z-10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100">
                      <div className="h-full w-full rounded-3xl bg-violet-500/10" />
                    </div>

                    <div className="mb-5 overflow-hidden rounded-2xl border border-white/10 bg-black/20">
                      <motion.img
                        layoutId={imageId}
                        src={p.image}
                        alt={p.title}
                        className="h-52 w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        transition={{ type: "spring", stiffness: 320, damping: 30 }}
                      />
                    </div>

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

                    <motion.h3
                      layoutId={titleId}
                      className="font-display mt-5 text-xl font-semibold leading-snug tracking-[-0.02em] text-white"
                      transition={{ type: "spring", stiffness: 320, damping: 30 }}
                    >
                      {p.title}
                    </motion.h3>

                    <p className="mt-3 text-sm leading-7 text-slate-300">{p.desc}</p>

                    <div className="mt-5 text-sm font-medium text-violet-400 transition group-hover:text-violet-200">
                      See more →
                    </div>
                  </article>
                );
              })}

              {Array.from({ length: cardsPerPage - pageProjects.length }).map((_, i) => (
                <div key={`empty-${pageIndex}-${i}`} className="invisible" />
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function ModalContent({ project }: { project: Project }) {
  const imageId = `project-image-${project.title}`;
  const titleId = `project-title-${project.title}`;
  const [showReport, setShowReport] = useState(false);
  const [activeVisual, setActiveVisual] = useState(0);

  const visualToShow =
    project.visuals && project.visuals.length > 0
      ? project.visuals[activeVisual]
      : { image: project.image, caption: "", tab: "Main", type: "image" as const };

  return (
    <div className="grid items-start gap-0 md:grid-cols-[1.35fr_0.95fr]">
      <div className="flex flex-col gap-4 border-r border-white/10 bg-black/20 p-6">
        <div className="flex h-[55vh] w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-slate-950/40">
          <AnimatePresence mode="wait">
            {visualToShow.type === "html-img" ? (
              <iframe
                src={visualToShow.image}
                title={visualToShow.tab}
                className="h-[55vh] w-full rounded-2xl border border-white/10 bg-white"
              />
            ) : visualToShow.type === "map" ? (
              <ZoomMap imageUrl={visualToShow.image} bounds={[[25, -125], [50, -65]]} />
            ) : (
              <motion.img
                key={visualToShow.image}
                layoutId={imageId}
                src={visualToShow.image}
                alt={visualToShow.tab}
                className="block max-h-full max-w-full object-contain"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
              />
            )}
          </AnimatePresence>
        </div>

        {project.visuals && project.visuals.length > 0 ? (
          <div className="mt-2">
            <div className="flex flex-wrap gap-2">
              {project.visuals.map((visual, index) => (
                <button
                  key={visual.tab}
                  onClick={() => setActiveVisual(index)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    activeVisual === index
                      ? "bg-violet-600 text-white"
                      : "border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
                  }`}
                >
                  {visual.tab}
                </button>
              ))}
            </div>

            <p className="mt-3 text-sm text-slate-400">{visualToShow.caption}</p>
          </div>
        ) : null}
      </div>

      <div className="max-h-[90vh] overflow-y-auto p-6 md:p-8">
        <motion.h3
          layoutId={titleId}
          className="font-display text-2xl font-semibold leading-tight tracking-[-0.03em] text-white md:text-3xl"
          transition={{ type: "spring", stiffness: 320, damping: 30 }}
        >
          {project.title}
        </motion.h3>

        <p className="mt-4 leading-7 text-slate-300">{project.desc}</p>

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

        <div className="mt-6">
          <h4 className="text-xs font-medium uppercase tracking-[0.22em] text-slate-500">
            Tools Used
          </h4>
          <div className="mt-2 flex flex-wrap gap-2">
            {project.tools.map((tool) => (
              <span
                key={tool}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        <ul className="mt-6 list-disc space-y-2 pl-5 text-slate-300">
          {project.details.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>

        <div className="mt-6 flex gap-3">
          <button
            onClick={() => setShowReport((prev) => !prev)}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
          >
            {showReport ? "Hide Preview" : "Read more"}
          </button>

          {project.links.github && project.links.github !== "#" ? (
            <a
              href={project.links.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-500"
            >
              GitHub
            </a>
          ) : null}
        </div>

        {showReport && project.report ? (
          <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-white">
            <div className="flex items-center justify-between border-b border-black/10 bg-slate-100 px-4 py-2">
              <button
                onClick={() => setShowReport(false)}
                className="text-sm font-semibold text-violet-700 hover:text-red-500"
              >
                Hide Preview
              </button>
              <a
                href={project.report}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-semibold text-violet-700 hover:text-red-500"
              >
                Open in new tab
              </a>
            </div>

            <iframe
              src={project.report}
              title={`${project.title} report`}
              className="h-[700px] w-full"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}