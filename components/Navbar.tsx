import { label } from "framer-motion/client";

const links = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Timeline", href: "#schedule" },
  { label: "Contact", href: "#contact" },
  {label: "Skills",href:"#skills"},
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <a href="#top" className="flex items-center gap-2 font-semibold">
          <span className="h-2.5 w-2.5 rounded-full bg-violet-400 shadow-[0_0_0_6px_rgba(167,139,250,0.15)]" />
          <span>Keerthi Teja M</span>
        </a>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-slate-300 hover:text-white">
              {l.label}
            </a>
          ))}

          <a
            href="#contact"
            className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-500"
          >
            Contact
          </a>
        </nav>

        <div className="text-xs text-slate-400 md:hidden">Scroll ↓</div>
      </div>
    </header>
  );
}