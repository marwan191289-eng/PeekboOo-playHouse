import type { Lang } from "@/i18n/translations";

let voicesCache: SpeechSynthesisVoice[] = [];

function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      resolve([]);
      return;
    }
    const existing = window.speechSynthesis.getVoices();
    if (existing.length) {
      voicesCache = existing;
      resolve(existing);
      return;
    }
    window.speechSynthesis.onvoiceschanged = () => {
      voicesCache = window.speechSynthesis.getVoices();
      resolve(voicesCache);
    };
  });
}

if (typeof window !== "undefined" && "speechSynthesis" in window) {
  loadVoices();
}

export interface SpeakOptions {
  lang?: Lang | string;
  rate?: number;
  pitch?: number;
  volume?: number;
}

export function speak(text: string, opts: SpeakOptions = {}) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  const synth = window.speechSynthesis;
  synth.cancel();

  const utt = new SpeechSynthesisUtterance(text);
  const wantedLang =
    opts.lang === "ar" ? "ar-SA" : opts.lang === "en" ? "en-US" : opts.lang || "en-US";
  utt.lang = wantedLang;
  utt.rate = opts.rate ?? 0.9;
  utt.pitch = opts.pitch ?? 1.15;
  utt.volume = opts.volume ?? 1;

  const voices = voicesCache.length ? voicesCache : synth.getVoices();
  const langPrefix = wantedLang.split("-")[0];
  const match =
    voices.find((v) => v.lang.toLowerCase() === wantedLang.toLowerCase()) ||
    voices.find((v) => v.lang.toLowerCase().startsWith(langPrefix));
  if (match) utt.voice = match;

  synth.speak(utt);
}

export function stopSpeaking() {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}
