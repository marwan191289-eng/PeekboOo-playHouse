import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Play } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { useLanguage } from "@/contexts/LanguageContext";
import type { MediaItem } from "@/data/learning";

interface Props {
  storageKey: string;
  defaults: MediaItem[];
  title: string;
  subtitle: string;
  emoji: string;
  color: string;
  addLabel: string;
}

function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  // already an ID
  if (/^[\w-]{11}$/.test(url.trim())) return url.trim();
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) return u.pathname.slice(1).split("/")[0];
    if (u.searchParams.get("v")) return u.searchParams.get("v");
    const m = u.pathname.match(/\/embed\/([\w-]{11})/);
    if (m) return m[1];
    const sm = u.pathname.match(/\/shorts\/([\w-]{11})/);
    if (sm) return sm[1];
  } catch {}
  const m = url.match(/([\w-]{11})/);
  return m ? m[1] : null;
}

export default function MediaPage({
  storageKey, defaults, title, subtitle, emoji, color, addLabel,
}: Props) {
  const { t, lang } = useLanguage();
  const [items, setItems] = useState<MediaItem[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [titleInput, setTitleInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [playing, setPlaying] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "ar" | "en">("all");

  useEffect(() => {
    const raw = localStorage.getItem(storageKey);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setItems(parsed);
          return;
        }
      } catch {}
    }
    setItems(defaults);
  }, [storageKey, defaults]);

  const persist = (next: MediaItem[]) => {
    setItems(next);
    localStorage.setItem(storageKey, JSON.stringify(next));
  };

  const handleAdd = () => {
    const id = extractYouTubeId(urlInput);
    if (!titleInput.trim() || !id) return;
    const newItem: MediaItem = {
      id: `u_${Date.now()}`,
      title: titleInput.trim(),
      youtubeId: id,
      lang,
    };
    persist([newItem, ...items]);
    setTitleInput("");
    setUrlInput("");
    setShowAdd(false);
  };

  const handleDelete = (id: string) => {
    persist(items.filter((i) => i.id !== id));
    if (playing === id) setPlaying(null);
  };

  const filtered = filter === "all" ? items : items.filter((i) => i.lang === filter);

  return (
    <div className="px-6 py-12 max-w-6xl mx-auto">
      <PageHeader title={title} subtitle={subtitle} emoji={emoji} color={color} />

      <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
        {(["all", "ar", "en"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-5 py-2 rounded-xl font-bold transition-all ${
              filter === f ? "text-white shadow-lg scale-105" : "bg-white text-slate-600 border-2 border-slate-200"
            }`}
            style={filter === f ? { backgroundColor: color } : {}}
          >
            {f === "all" ? (lang === "ar" ? "الكل" : "All") : f === "ar" ? "العربية" : "English"}
          </button>
        ))}
        <button
          onClick={() => setShowAdd(true)}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FFD166] to-[#F77F00] text-white px-5 py-2 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform"
        >
          <Plus size={18} />
          {addLabel}
        </button>
      </div>

      <AnimatePresence>
        {showAdd && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-8"
          >
            <div className="bg-white rounded-3xl shadow-xl p-6 border-4" style={{ borderColor: color }}>
              <div className="grid sm:grid-cols-2 gap-3">
                <input
                  value={titleInput}
                  onChange={(e) => setTitleInput(e.target.value)}
                  placeholder={t("common.title")}
                  className="bg-slate-100 rounded-xl px-4 py-3 font-medium border-2 border-slate-200 focus:border-[#8338EC] focus:outline-none"
                />
                <input
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder={t("common.youtubeUrl")}
                  className="bg-slate-100 rounded-xl px-4 py-3 font-medium border-2 border-slate-200 focus:border-[#8338EC] focus:outline-none"
                />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => { setShowAdd(false); setTitleInput(""); setUrlInput(""); }}
                  className="px-5 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200"
                >
                  {t("common.cancel")}
                </button>
                <button
                  onClick={handleAdd}
                  disabled={!titleInput.trim() || !extractYouTubeId(urlInput)}
                  className="px-5 py-2 rounded-xl text-white font-bold disabled:opacity-40"
                  style={{ backgroundColor: color }}
                >
                  {t("common.save")}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-white rounded-3xl shadow-lg overflow-hidden border-4 hover:shadow-2xl transition-shadow"
            style={{ borderColor: color }}
          >
            <div className="aspect-video bg-slate-100 relative">
              {playing === item.id ? (
                <iframe
                  src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=1&rel=0`}
                  title={item.title}
                  className="w-full h-full"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <button
                  onClick={() => setPlaying(item.id)}
                  className="w-full h-full relative group"
                >
                  <img
                    src={`https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/95 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                      <Play size={28} className="text-[#EF476F] ms-1" fill="#EF476F" />
                    </div>
                  </div>
                </button>
              )}
            </div>
            <div className="p-4 flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <h3 className="font-display font-bold text-slate-800 truncate">{item.title}</h3>
                <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-bold">
                  {item.lang === "ar" ? "العربية" : "English"}
                </span>
              </div>
              {item.id.startsWith("u_") && (
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-slate-400 hover:text-[#EF476F] p-2 rounded-lg hover:bg-slate-100 transition-colors"
                  aria-label="Delete"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
