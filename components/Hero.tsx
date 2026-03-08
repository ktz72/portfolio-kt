export default function Hero() {
  return (
    <section id="top" className="py-14 md:py-20">
      <p className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-300">
        GIS • Remote Sensing • Machine Learning
      </p>

      <h1 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
        Hi, I’m <span className="text-violet-300">Keerthi Teja</span>.
        <br />
        I build maps & models that tell stories.
      </h1>

      <p className="mt-4 max-w-2xl text-slate-300">
        GIS • Remote Sensing • Risk Modeling
        
      </p>

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