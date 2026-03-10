export default function Hero() {
  return (
    <section id="top" className="py-14 md:py-20">
      <p className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-300">
        GIS • Remote Sensing • Machine Learning
      </p>

      <h1 className="text-5xl font-bold leading-tight md:text-6xl">
        Hi, I’m {""} <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">Keerthi Teja</span>.
        <br />
        I turn spatial data into maps, models and meaninful insights.
      </h1>



      <div className="mt-6 flex flex-wrap gap-3">
        <a
          href="#projects"
          className="rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-500"
        >
          See Projects
        </a>
        <a
          href="#contact"
          className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold hover:bg-white/10"
        >
          Get in Touch
        </a>
      </div>
    </section>
  );
}