import { Link } from "wouter";
import { motion } from "framer-motion";
import { Book, Sparkles, Heart, Palette, Music, Video, Brain, Star, Play, Bot } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const tiles = [
  { path: "/letters", key: "letters", icon: Book, color: "#8338EC", emoji: "🔤" },
  { path: "/numbers", key: "numbers", icon: Sparkles, color: "#06D6A0", emoji: "🔢" },
  { path: "/animals", key: "animals", icon: Heart, color: "#F77F00", emoji: "🦁" },
  { path: "/colors", key: "colors", icon: Palette, color: "#118AB2", emoji: "🎨" },
  { path: "/songs", key: "songs", icon: Music, color: "#EF476F", emoji: "🎵" },
  { path: "/videos", key: "videos", icon: Video, color: "#06D6A0", emoji: "📺" },
  { path: "/quiz", key: "quiz", icon: Brain, color: "#8338EC", emoji: "🧠" },
  { path: "/teacher", key: "teacher", icon: Star, color: "#F77F00", emoji: "🤖" },
];

export default function Home() {
  const { t } = useLanguage();
  return (
    <div className="bg-polka">
      {/* Hero */}
      <section className="px-6 py-16 md:py-24">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 1 }}
            className="text-7xl md:text-8xl mb-4 inline-block"
          >
            🌟
          </motion.div>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="font-display text-5xl md:text-7xl font-extrabold"
          >
            <span className="text-[#EF476F]">{t("brand")}</span>{" "}
            <span className="text-[#8338EC]">{t("tagline")}</span>
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-lg md:text-2xl text-slate-700 max-w-3xl mx-auto mt-6 font-semibold"
          >
            {t("hero.subtitle")}
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 mt-10"
          >
            <Link
              href="/letters"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#EF476F] to-[#8338EC] text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl hover:scale-105 transition-transform"
            >
              <Play size={22} fill="white" />
              {t("hero.start")}
            </Link>
            <Link
              href="/teacher"
              className="inline-flex items-center gap-2 bg-white text-[#8338EC] px-8 py-4 rounded-2xl font-bold text-lg shadow-xl border-4 border-[#8338EC] hover:scale-105 transition-transform"
            >
              <Bot size={22} />
              {t("hero.askTeacher")}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Tiles */}
      <section className="px-6 pb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {tiles.map((tile, i) => {
            const Icon = tile.icon;
            return (
              <motion.div
                key={tile.path}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, type: "spring" }}
                whileHover={{ y: -8, rotate: [-1, 1, 0] }}
              >
                <Link
                  href={tile.path}
                  className="block bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-shadow border-4"
                  style={{ borderColor: tile.color }}
                >
                  <div className="text-5xl mb-3 text-center">{tile.emoji}</div>
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3"
                    style={{ backgroundColor: tile.color }}
                  >
                    <Icon size={24} className="text-white" />
                  </div>
                  <h3
                    className="font-display text-xl font-bold text-center"
                    style={{ color: tile.color }}
                  >
                    {t(`nav.${tile.key}`)}
                  </h3>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
