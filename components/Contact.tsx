import Magnetic from "./Magnetic";

export default function Contact() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 px-8 py-10 backdrop-blur-md md:px-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <p className="text-semibold uppercase tracking-[0.25em] text-slate-500">
            Let's Connect
          </p>
          
          <p className="mt-3 text-base text-slate-300">
            I’m currently open to internships, full-time and research opportunities in GIS, Remote Sensing.
            
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Magnetic>
          <a
            href="mailto:keerthitejam7@gmail.com"
            className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
          >
            Email
          </a>
          </Magnetic>


          <Magnetic>
          <a
            href="https://www.linkedin.com/in/keerthi-teja-428113166/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            LinkedIn
          </a>
          </Magnetic>
        </div>
      </div>
    </div>
  );
}