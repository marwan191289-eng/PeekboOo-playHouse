import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
  title: string;
  subtitle?: string;
  emoji?: string;
  color?: string;
  children?: ReactNode;
}

export default function PageHeader({ title, subtitle, emoji, color = "#8338EC", children }: Props) {
  return (
    <div className="text-center mb-10">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="inline-flex items-center gap-3 mb-3"
      >
        {emoji && <span className="text-5xl">{emoji}</span>}
        <h1
          className="font-display text-4xl md:text-5xl font-extrabold"
          style={{ color }}
        >
          {title}
        </h1>
      </motion.div>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-slate-600 text-lg max-w-2xl mx-auto"
        >
          {subtitle}
        </motion.p>
      )}
      {children}
    </div>
  );
}
