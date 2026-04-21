import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageHeader from "@/components/PageHeader";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRewards } from "@/contexts/RewardsContext";
import { speak } from "@/lib/speech";
import { colors } from "@/data/learning";

export default function Colors() {
  const { lang, t } = useLanguage();
  const { addStars } = useRewards();
  const [copied, setCopied] = useState<string | null>(null);

  const handleClick = (c: typeof colors[number]) => {
    const name = lang === "ar" ? c.ar : c.en;
    speak(name, { lang });
    addStars(1);
    navigator.clipboard?.writeText(c.hex).catch(() => {});
    setCopied(c.hex);
    setTimeout(() => setCopied(null), 1200);
  };

  return (
    <div className="px-6 py-12 max-w-6xl mx-auto">
      <PageHeader
        title={t("pages.colors.title")}
        subtitle={t("pages.colors.subtitle")}
        emoji="🎨"
        color="#118AB2"
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
        {colors.map((c, i) => {
          const isLight = ["#FFD166", "#FCF6BD", "#FFFFFF", "#80ED99", "#48CAE4"].includes(c.hex);
          const textColor = isLight ? "#2b2d42" : "#fff";
          return (
            <motion.button
              key={c.hex}
              onClick={() => handleClick(c)}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.04, type: "spring" }}
              whileHover={{ y: -6, scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              className="relative h-40 rounded-3xl shadow-xl flex flex-col items-center justify-center font-display font-extrabold border-4 border-white overflow-hidden px-3"
              style={{ backgroundColor: c.hex, color: textColor }}
            >
              <div className="text-xl sm:text-2xl truncate w-full text-center">{lang === "ar" ? c.ar : c.en}</div>
              <div className="text-xs font-mono opacity-80 mt-1">{c.hex}</div>
              <AnimatePresence>
                {copied === c.hex && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-lg"
                  >
                    ✓ {c.hex}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
