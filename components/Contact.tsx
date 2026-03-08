export default function Contact() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <p className="text-slate-300">
        Email:{" "}
        <a className="font-semibold text-slate-100 hover:text-white" href="mailto:keerthitejam7@gmail.com">
          keerthitejam7@gmail.com
        </a>
        <br />
        LinkedIn:{" "}
        <a className="font-semibold text-slate-100 hover:text-white" href="https/linkedin.com/in/keerthi-teja-428113166" target="_blank" rel="noreferrer">
          Keerthi Teja
        </a>
      </p>

      <a
        href="mailto:keerthitejam7@gmail.com"
        className="mt-5 inline-flex rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
      >
        Email me
      </a>
    </div>
  );
}