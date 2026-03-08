export const SECTION_COLORS: Record<
  string,
  { bar: string; a: string; b: string; line: string }
> = {
  about: {
    bar: "#8b5cf6", // violet
    a: "rgba(139,92,246,0.22)",
    b: "rgba(34,211,238,0.18)",
    line: "rgba(167,139,250,0.35)",
  },
  projects: {
    bar: "#22c55e", // green
    a: "rgba(34,197,94,0.22)",
    b: "rgba(59,130,246,0.16)", // blue
    line: "rgba(34,197,94,0.35)",
  },
  timeline: {
    bar: "#06b6d4", // cyan
    a: "rgba(34,211,238,0.22)",
    b: "rgba(139,92,246,0.14)", // violet
    line: "rgba(34,211,238,0.35)",
  },
  skills:{
    bar: "#a855f7",
    a: "rgba(168,85,247,0.22)",
    b: "rgba(59,130,249,0.14)",
    line: "rgba(168,85,247,0.35)",
  },
  contact: {
    bar: "#f59e0b", // amber
    a: "rgba(245,158,11,0.22)",
    b: "rgba(239,68,68,0.14)", // red
    line: "rgba(245,158,11,0.35)",
  },
};