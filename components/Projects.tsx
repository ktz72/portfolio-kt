  "use client";

  import { useEffect, useState } from "react";
  import Modal from "@/components/Modal";
  import { LayoutGroup, motion,AnimatePresence} from "framer-motion";


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
    report?:string;
    visuals?:{
      tab:string;
      image:string;
      caption:string;
    }[];
  };

  const projects: Project[] = [
    {
      title: "Electricity Sector CO₂ Emissions Analysis — Georgia vs U.S. States",
      desc: "Analyzed electricity-sector CO₂ emissions in Georgia and compared them with Tennessee, Texas, California, and the U.S. using EIA State Energy Data System data. Built fuel-mix visualizations, emissions trends, and spatial maps using R.",
      tags: ["R Programming", "GIS","Energy Data","CO₂ Analysis","Data Visualization"],
      image: "/projects/CCA/CO2_Map.png",
      links: { read: "/Reports/CCAProject_KeerthiTeja.pdf", github: "#" },
      details: [
        "Used EIA State Energy Data System data to compare electricity fuel mix and emissions.",
      "Estimated emissions by applying fuel-specific CO₂ coefficients to electric-sector fuel input.",
      "Built fuel mix charts, trend plots, per-capita comparisons, and state-level maps in R."     
      ],
      tools:["R-Studio","tmap","ggplot"],
      dataset:["US EIA State Energy Data System (SEDS)."],
      workflow:["Filtered SEDS data for GA, TN, TX, CA, and the U.S.",
      "Calculated fuel shares for electricity generation.",
      "Estimated total and per-capita CO₂ emissions using fuel-specific coefficients.",
      "Visualized trends and mapped 2023 emissions for comparison."],
      report:"/Reports/CCAProject_KeerthiTeja.pdf",
      visuals:[
        {
          tab:"Map",
          image:"/projects/CCA/CO2_Map.png",
          caption:"State-level electricity-sector CO₂ emissions in 2023 for Georgia, Tennessee, Texas, and California."
        },
        {
          tab:"Fuel-Mix",
          image:"/projects/CCA/Fuel plot-2023.png",
          caption:"Comparison of fuel mix across states, highlighting differences in coal, gas, nuclear, and renewables."
        },
        {
          tab:"Per-Capita Trend",
          image:"/projects/CCA/Per_capita.png",
          caption:"Per-capita electricity-sector emissions comparison across the selected states."
        },
        {
          tab:"State-wise Emissions",
          image:"/projects/CCA/2023_emissions.png",
          caption:"Electricity-sector CO₂ emissions for selected states in 2023, shows Texas as the largest emitter while Georgia, California, and Tennessee contribute substantially lower levels"
        }
      ]
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
  const [showReport, setShowReport] = useState(false);
  const [activeVisual, setActiveVisual] = useState(0);

  const visualToShow =
    project.visuals && project.visuals.length > 0
      ? project.visuals[activeVisual]
      : { image: project.image, caption: "", tab: "Main" };

  return (
    <div className="grid gap-0 md:grid-cols-[1.35fr_0.95fr] items-start">
      {/* LEFT COLUMN */}
      <div className="flex flex-col gap-4 border-r border-white/10 bg-black/20 p-6">
        <div className="flex h-[55vh] w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-slate-950/40">
        <AnimatePresence>
          <motion.img
            key={visualToShow.image}
            layoutId={imageId}
            src={visualToShow.image}
            alt={visualToShow.tab}
            className="block max-h-full max-w-full object-contain"
            initial={{opacity:0,scale:0.96}}
            animate={{opacity:1,scale:1}}
            exit={{opacity:0,scale:0.96}}
            transition={{ duration:0.35 }}
          />
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

            <p className="mt-3 text-sm text-slate-400">
              {visualToShow.caption}
            </p>
          </div>
        ) : null}
      </div>

      {/* RIGHT COLUMN */}
      <div className="max-h-[90vh] overflow-y-auto p-6 md:p-8">
        <motion.h3
          layoutId={titleId}
          className="text-2xl font-bold leading-tight"
          transition={{ type: "spring", stiffness: 320, damping: 30 }}
        >
          {project.title}
        </motion.h3>

        <p className="mt-4 text-slate-300">{project.desc}</p>

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
          <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
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
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold hover:bg-white/10"
          >
            {showReport ? "Hide Preview" : "Read more"}
          </button>

          {project.links.github && project.links.github !== "#" ? (
            <a
              href={project.links.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-500"
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