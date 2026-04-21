import { useState } from "react";
import { motion } from "framer-motion";
import { Volume2 } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRewards } from "@/contexts/RewardsContext";
import { speak } from "@/lib/speech";
import { animals } from "@/data/learning";

const palette = ["#EF476F", "#8338EC", "#06D6A0", "#118AB2", "#F77F00", "#FFD166"];

export default function Animals() {
  const { lang, t } = useLanguage();
  const { addStars } = useRewards();
  const [active, setActive] = useState<string | null>(null);

  const handleClick = (a: typeof animals[number]) => {
    setActive(a.emoji);
    const info = lang === "ar" ? a.ar : a.en;
    const text = info.sound ? `${info.name}. ${info.sound}` : info.name;
    speak(text, { lang });
    addStars(1);
    setTimeout(() => setActive(null), 700);
  };

  return (
    <div className="px-6 py-12 max-w-6xl mx-auto">
      <PageHeader
        title={t("pages.animals.title")}
        subtitle={t("pages.animals.subtitle")}
        emoji="🦁"
        color="#F77F00"
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
        {animals.map((a, i) => {
          const color = palette[i % palette.length];
          const info = lang === "ar" ? a.ar : a.en;
          const isActive = active === a.emoji;
          return (
            <motion.button
              key={a.emoji}
              onClick={() => handleClick(a)}
              whileHover={{ y: -6, scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              animate={isActive ? { rotate: [0, -8, 8, 0], scale: [1, 1.15, 1] } : {}}
              className="relative bg-white rounded-3xl p-4 pt-7 shadow-lg flex flex-col items-center justify-center gap-1 border-4 hover:shadow-2xl transition-shadow overflow-hidden min-h-[180px]"
              style={{ borderColor: color }}
            >
              <Volume2 size={14} className="absolute top-2 end-2 text-slate-400 pointer-events-none" />
              <div className="text-5xl sm:text-6xl leading-none">{a.emoji}</div>
              <div className="font-display text-lg sm:text-xl font-extrabold truncate w-full text-center px-1" style={{ color }}>
                {info.name}
              </div>
              {info.sound && (
                <div className="text-xs font-bold text-slate-500 truncate w-full text-center px-1">{info.sound}</div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
