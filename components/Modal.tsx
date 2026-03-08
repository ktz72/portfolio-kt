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
  // If we don't have a click origin yet, default to center
  const x = origin?.x ?? 0;
  const y = origin?.y ?? 0;

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop (dim + blur) */}
          <motion.button
            aria-label="Close modal"
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-black/60 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Dialog (opens from click origin) */}
          <motion.div
            role="dialog"
            aria-modal="true"
            className="relative w-[min(1100px,92vw)] max-h-[90vh] h-full overflow-hidden rounded-3xl border border-white/10 bg-slate-950 text-slate-100 shadow-2xl"
            style={{ transformOrigin: `${x}px ${y}px` }}
            initial={{ scale: 0.55, opacity: 0, y: 18 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 10 }}
            transition={{ type: "spring", stiffness: 420, damping: 34 }}
          >
            <button
              onClick={onClose}
              className="absolute right-3 top-3 rounded-xl border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-200 hover:bg-white/10"
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