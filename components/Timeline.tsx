export default function Timeline() {
  return (
    <div className="space-y-3">
      {[
        {
          year: "2026",
          title: "MS GIS&T — Georgia Tech",
          desc: "Focus on geospatial analytics & remote sensing.",
        },
        {
          year: "2025",
          title: "Raster Suitability Workflow",
          desc: "Reclass + weighted overlay + validation.",
        },
        {
          year: "2024",
          title: "Internship / Role",
          desc: "Describe impact in 1–2 lines.",
        },
      ].map((item) => (
        <div
          key={item.year}
          className="grid gap-3 md:grid-cols-[110px_1fr]"
        >
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center font-bold text-slate-300">
            {item.year}
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm text-slate-300">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}