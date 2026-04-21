import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home, Book, Sparkles, Heart, Palette, Music, Video, Brain, Star, Menu, X, Languages,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRewards } from "@/contexts/RewardsContext";

const items = [
  { path: "/", key: "home", icon: Home, color: "#EF476F" },
  { path: "/letters", key: "letters", icon: Book, color: "#8338EC" },
  { path: "/numbers", key: "numbers", icon: Sparkles, color: "#06D6A0" },
  { path: "/animals", key: "animals", icon: Heart, color: "#F77F00" },
  { path: "/colors", key: "colors", icon: Palette, color: "#118AB2" },
  { path: "/songs", key: "songs", icon: Music, color: "#EF476F" },
  { path: "/videos", key: "videos", icon: Video, color: "#06D6A0" },
  { path: "/quiz", key: "quiz", icon: Brain, color: "#8338EC" },
  { path: "/teacher", key: "teacher", icon: Star, color: "#F77F00" },
];

export default function NavBar() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const { t, lang, toggle, dir } = useLanguage();
  const { stars } = useRewards();

  return (
    <nav
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b-4 border-[#FFD166]"
      dir={dir}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="text-3xl">🌟</span>
          <div>
            <div className="font-display font-bold text-xl leading-none flex">
              <span className="text-[#EF476F]">{t("brand").slice(0, Math.ceil(t("brand").length / 2))}</span>
              <span className="text-[#8338EC]">{t("brand").slice(Math.ceil(t("brand").length / 2))}</span>
            </div>
            <div className="text-xs text-[#F77F00] font-bold mt-0.5">{t("tagline")}</div>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-1.5 flex-wrap justify-end flex-1">
          {items.map((it) => {
            const active = location === it.path;
            const Icon = it.icon;
            return (
              <Link
                key={it.path}
                href={it.path}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-bold transition-all hover:scale-105 ${
                  active ? "text-white shadow-lg" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
                style={active ? { backgroundColor: it.color } : {}}
              >
                <Icon size={15} />
                {t(`nav.${it.key}`)}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="hidden sm:flex items-center gap-1 bg-gradient-to-r from-[#FFD166] to-[#F77F00] text-white px-3 py-2 rounded-xl font-bold shadow-md">
            <Star size={16} fill="white" />
            <span className="text-sm">{stars}</span>
          </div>
          <button
            onClick={toggle}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#118AB2] text-white font-bold text-sm hover:scale-105 transition-transform"
            aria-label="Toggle language"
          >
            <Languages size={16} />
            {lang === "ar" ? "EN" : "ع"}
          </button>
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-xl bg-[#FFD166]/30"
            aria-label="Menu"
          >
            {open ? <X size={22} className="text-[#8338EC]" /> : <Menu size={22} className="text-[#8338EC]" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="overflow-hidden lg:hidden bg-white border-t border-slate-100"
          >
            <div className="p-4 grid grid-cols-3 gap-2">
              {items.map((it) => {
                const Icon = it.icon;
                return (
                  <Link
                    key={it.path}
                    href={it.path}
                    onClick={() => setOpen(false)}
                    className="flex flex-col items-center gap-1 p-3 rounded-2xl text-xs font-bold text-center"
                    style={{ backgroundColor: it.color + "20", color: it.color }}
                  >
                    <Icon size={22} />
                    {t(`nav.${it.key}`)}
                  </Link>
                );
              })}
            </div>
            <div className="px-4 pb-4 sm:hidden">
              <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#FFD166] to-[#F77F00] text-white px-4 py-3 rounded-xl font-bold">
                <Star size={20} fill="white" />
                {stars} {t("common.score")}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
