import { createContext, useCallback, useContext, useEffect, useRef, useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";

interface RewardsCtx {
  stars: number;
  addStars: (n: number) => void;
  celebrate: (message?: string) => void;
  reset: () => void;
}

const Ctx = createContext<RewardsCtx | null>(null);

interface Toast {
  id: number;
  message: string;
}

export function RewardsProvider({ children }: { children: ReactNode }) {
  const [stars, setStars] = useState<number>(() => {
    if (typeof window === "undefined") return 0;
    return Number(localStorage.getItem("peekaboo.stars") || 0);
  });
  const [toasts, setToasts] = useState<Toast[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    localStorage.setItem("peekaboo.stars", String(stars));
  }, [stars]);

  const addStars = useCallback((n: number) => setStars((s) => s + n), []);

  const celebrate = useCallback((message = "⭐") => {
    const id = ++idRef.current;
    setToasts((prev) => [...prev, { id, message }]);
    // tiny burst of confetti via DOM particles
    spawnConfetti();
    // play happy sound
    playDing();
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2200);
  }, []);

  const reset = useCallback(() => setStars(0), []);

  return (
    <Ctx.Provider value={{ stars, addStars, celebrate, reset }}>
      {children}
      <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] pointer-events-none flex flex-col gap-2 items-center">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ y: -30, opacity: 0, scale: 0.7 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0, scale: 0.7 }}
              className="bg-gradient-to-r from-[#FFD166] to-[#F77F00] text-white px-6 py-3 rounded-2xl shadow-2xl font-bold text-lg flex items-center gap-2 border-4 border-white"
            >
              <Star size={22} fill="white" />
              {toast.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Ctx.Provider>
  );
}

export function useRewards() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useRewards must be inside RewardsProvider");
  return c;
}

function spawnConfetti() {
  const colors = ["#EF476F", "#FFD166", "#06D6A0", "#118AB2", "#8338EC", "#F77F00"];
  const container = document.createElement("div");
  container.style.cssText =
    "position:fixed;inset:0;pointer-events:none;z-index:9999;overflow:hidden";
  document.body.appendChild(container);
  for (let i = 0; i < 60; i++) {
    const p = document.createElement("div");
    const size = 6 + Math.random() * 8;
    const startX = 50 + (Math.random() - 0.5) * 30;
    const angle = (Math.random() - 0.5) * 220;
    const distance = 200 + Math.random() * 250;
    p.style.cssText = `position:absolute;top:50%;left:${startX}%;width:${size}px;height:${size}px;background:${colors[i % colors.length]};border-radius:${Math.random() > 0.5 ? "50%" : "2px"};transform:translate(-50%,-50%);transition:all 1.6s cubic-bezier(.2,.8,.4,1);opacity:1`;
    container.appendChild(p);
    requestAnimationFrame(() => {
      p.style.transform = `translate(${angle}px, ${distance}px) rotate(${Math.random() * 720}deg)`;
      p.style.opacity = "0";
    });
  }
  setTimeout(() => container.remove(), 1800);
}

let audioCtx: AudioContext | null = null;
function playDing() {
  try {
    if (!audioCtx) {
      const AC =
        (window as any).AudioContext || (window as any).webkitAudioContext;
      if (!AC) return;
      audioCtx = new AC();
    }
    const ctx = audioCtx!;
    const now = ctx.currentTime;
    [659.25, 783.99, 1046.5].forEach((freq, i) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "triangle";
      o.frequency.value = freq;
      g.gain.setValueAtTime(0.0001, now + i * 0.08);
      g.gain.exponentialRampToValueAtTime(0.18, now + i * 0.08 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.08 + 0.35);
      o.connect(g).connect(ctx.destination);
      o.start(now + i * 0.08);
      o.stop(now + i * 0.08 + 0.4);
    });
  } catch {}
}
