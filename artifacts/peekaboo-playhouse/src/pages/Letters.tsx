import { useState } from "react";
import { motion } from "framer-motion";
import { Volume2 } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRewards } from "@/contexts/RewardsContext";
import { speak } from "@/lib/speech";
import { arabicLetters, englishLetters } from "@/data/learning";

const palette = ["#EF476F", "#8338EC", "#06D6A0", "#118AB2", "#F77F00", "#FFD166"];

export default function Letters() {
  const { lang, t } = useLanguage();
  const { addStars, celebrate } = useRewards();
  const [tab, setTab] = useState<"ar" | "en">(lang);
  const [active, setActive] = useState<string | null>(null);

  const data = tab === "ar" ? arabicLetters : englishLetters;

  const handleClick = (item: any) => {
    setActive(item.ch);
    if (tab === "ar") {
      speak(`${item.name}. ${item.word}`, { lang: "ar" });
    } else {
      speak(`${item.ch}. ${item.word}`, { lang: "en" });
    }
    addStars(1);
    setTimeout(() => setActive(null), 600);
  };

  return (
    <div className="px-6 py-12 max-w-6xl mx-auto">
      <PageHeader
        title={t("pages.letters.title")}
        subtitle={t("pages.letters.subtitle")}
        emoji="🔤"
        color="#8338EC"
      />

      <div className="flex justify-center gap-3 mb-10">
        <button
          onClick={() => setTab("ar")}
          className={`px-6 py-2 rounded-xl font-bold transition-all ${
            tab === "ar" ? "bg-[#8338EC] text-white shadow-lg scale-105" : "bg-white text-slate-600 border-2 border-slate-200"
          }`}
        >
          العربية
        </button>
        <button
          onClick={() => setTab("en")}
          className={`px-6 py-2 rounded-xl font-bold transition-all ${
            tab === "en" ? "bg-[#8338EC] text-white shadow-lg scale-105" : "bg-white text-slate-600 border-2 border-slate-200"
          }`}
        >
          English
        </button>
        <button
          onClick={() => celebrate(t("common.rewardEarned"))}
          className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FFD166] text-[#F77F00] font-bold border-2 border-[#F77F00]"
        >
          🎉
        </button>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-4">
        {data.map((item, i) => {
          const color = palette[i % palette.length];
          const isActive = active === item.ch;
          return (
            <motion.button
              key={item.ch}
              onClick={() => handleClick(item)}
              whileHover={{ y: -4, scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              animate={isActive ? { scale: [1, 1.15, 1], rotate: [0, -8, 8, 0] } : {}}
              className="relative bg-white rounded-3xl p-4 shadow-lg flex flex-col items-center gap-2 group cursor-pointer border-4 hover:shadow-2xl transition-shadow"
              style={{ borderColor: color }}
            >
              <div className="text-5xl md:text-6xl font-display font-extrabold" style={{ color }}>
                {item.ch}
              </div>
              <div className="text-3xl">{item.emoji}</div>
              <div className="text-xs md:text-sm font-bold text-slate-700 text-center">{item.word}</div>
              <Volume2 size={14} className="absolute top-2 end-2 text-slate-400 group-hover:text-slate-700" />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
