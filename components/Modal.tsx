"use client";

import { AnimatePresence, motion } from "framer-motion";

export default function Modal({
  open,
  onClose,
  origin,
  children,
}: {
  open: boolean;
  onClose: () => void;
  origin: { x: number; y: number } | null;
  children: React.ReactNode;
}) {
  const x = origin?.x ?? 0;
  const y = origin?.y ?? 0;

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.button
            aria-label="Close modal"
            onClick={onClose}
            className="absolute inset-0 z-[300] cursor-default bg-slate-950/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            className="relative z-[310] h-full max-h-[90vh] w-[min(1100px,92vw)] overflow-hidden rounded-3xl border border-white/10 bg-slate-950 text-slate-100 shadow-[0_20px_80px_rgba(0,0,0,0.5)]"
            style={{ transformOrigin: `${x}px ${y}px` }}
            initial={{ scale: 0.55, opacity: 0, y: 18 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 10 }}
            transition={{ type: "spring", stiffness: 420, damping: 34 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute right-3 top-3 z-[320] rounded-xl border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-200 hover:bg-white/70"
            >
              ✕
            </button>

            <div className="h-full">{children}</div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}