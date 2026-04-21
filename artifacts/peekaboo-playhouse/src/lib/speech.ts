import type { Lang } from "@/i18n/translations";

const API_BASE = `${import.meta.env.BASE_URL}api`.replace(/\/+api$/, "/api");

let currentAudio: HTMLAudioElement | null = null;
const failedKeys = new Set<string>();

export interface SpeakOptions {
  lang?: Lang | string;
  volume?: number;
}

function browserFallback(text: string, lang: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  const synth = window.speechSynthesis;
  synth.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = lang === "ar" ? "ar-SA" : "en-US";
  utt.rate = 0.9;
  utt.pitch = 1.2;
  const voices = synth.getVoices();
  const langPrefix = utt.lang.split("-")[0];
  const match =
    voices.find((v) => v.lang.toLowerCase() === utt.lang.toLowerCase()) ||
    voices.find((v) => v.lang.toLowerCase().startsWith(langPrefix));
  if (match) utt.voice = match;
  synth.speak(utt);
}

export function stopSpeaking() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}

export async function speak(text: string, opts: SpeakOptions = {}) {
  if (!text) return;
  stopSpeaking();
  const lang = (opts.lang === "ar" || opts.lang === "en" ? opts.lang : "en") as Lang;
  const key = `${lang}::${text}`;

  if (!failedKeys.has(key)) {
    try {
      const url = `${API_BASE}/tts?lang=${lang}&text=${encodeURIComponent(text)}`;
      const audio = new Audio(url);
      audio.volume = opts.volume ?? 1;
      audio.preload = "auto";
      currentAudio = audio;
      await new Promise<void>((resolve, reject) => {
        const onErr = () => {
          audio.removeEventListener("error", onErr);
          reject(new Error("audio_error"));
        };
        audio.addEventListener("error", onErr, { once: true });
        audio.addEventListener("ended", () => resolve(), { once: true });
        audio.play().then(() => {}, (err) => reject(err));
        // Resolve early once playing has started so subsequent calls can interrupt smoothly
      });
      return;
    } catch {
      failedKeys.add(key);
    }
  }
  // Fallback to browser TTS if backend audio unavailable
  browserFallback(text, lang);
}
