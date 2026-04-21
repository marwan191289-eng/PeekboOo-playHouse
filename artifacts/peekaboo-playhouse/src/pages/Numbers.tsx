import { useState } from "react";
import { motion } from "framer-motion";
import { Volume2 } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRewards } from "@/contexts/RewardsContext";
import { speak } from "@/lib/speech";
import { numbers } from "@/data/learning";

const palette = ["#EF476F", "#8338EC", "#06D6A0", "#118AB2", "#F77F00", "#FFD166", "#48CAE4", "#80ED99"];

export default function Numbers() {
  const { lang, t } = useLanguage();
  const { addStars } = useRewards();
  const [tab, setTab] = useState<"ar" | "en">(lang);
  const [active, setActive] = useState<number | null>(null);

  const handleClick = (item: typeof numbers[number]) => {
    setActive(item.value);
    const txt = tab === "ar" ? item.ar.name : item.en.name;
    speak(txt, { lang: tab });
    addStars(1);
    setTimeout(() => setActive(null), 600);
  };

  return (
    <div className="px-6 py-12 max-w-6xl mx-auto">
      <PageHeader
        title={t("pages.numbers.title")}
        subtitle={t("pages.numbers.subtitle")}
        emoji="🔢"
        color="#06D6A0"
      />

      <div className="flex justify-center gap-3 mb-10">
        <button
          onClick={() => setTab("ar")}
          className={`px-6 py-2 rounded-xl font-bold transition-all ${
            tab === "ar" ? "bg-[#06D6A0] text-white shadow-lg scale-105" : "bg-white text-slate-600 border-2 border-slate-200"
          }`}
        >
          العربية
        </button>
        <button
          onClick={() => setTab("en")}
          className={`px-6 py-2 rounded-xl font-bold transition-all ${
            tab === "en" ? "bg-[#06D6A0] text-white shadow-lg scale-105" : "bg-white text-slate-600 border-2 border-slate-200"
          }`}
        >
          English
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {numbers.map((item, i) => {
          const color = palette[i % palette.length];
          const isActive = active === item.value;
          return (
            <motion.button
              key={item.value}
              onClick={() => handleClick(item)}
              whileHover={{ y: -4, scale: 1.04 }}
              whileTap={{ scale: 0.92 }}
              animate={isActive ? { scale: [1, 1.12, 1] } : {}}
              className="relative bg-white rounded-3xl p-4 pt-7 shadow-lg flex flex-col items-center justify-center gap-1 group border-4 hover:shadow-2xl transition-shadow overflow-hidden min-h-[180px]"
              style={{ borderColor: color }}
            >
              <Volume2 size={14} className="absolute top-2 end-2 text-slate-400 group-hover:text-slate-700 pointer-events-none" />
              <div className="text-5xl sm:text-6xl font-display font-extrabold leading-none" style={{ color }}>
                {tab === "ar" ? item.ar.digit : item.en.digit}
              </div>
              <div className="text-lg sm:text-xl font-bold text-slate-700 truncate w-full text-center px-1">
                {tab === "ar" ? item.ar.name : item.en.name}
              </div>
              <div className="text-base leading-none">{item.emoji}</div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
