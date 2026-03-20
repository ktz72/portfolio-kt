export default function Timeline() {
  return (
    <div className="space-y-3">
      {[
        {
          year: "2025",
          title: "MS GIS&T — Georgia Institute Of Technology",
          desc: "Started pursuing my Master's degree at Georgia Tech",
        },
        {
          year: "2023",
          title: "Graduation and First job",
          desc: "Completed my Bachelor's Study and landed my first job as a Trainee-Engineer focused on Processing LiDAR Data.",
        },
        {
          year: "2019",
          title: "Bachelor of Technology in Geoinformatics — Andhra University College of Engineering",
          desc: "Started pursuing my Bachelor's degree with main focus on Remote Sensing, GIS, and Information Technology",
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