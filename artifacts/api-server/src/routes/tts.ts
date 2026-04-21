import { Router, type IRouter } from "express";
import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";

const router: IRouter = Router();

const VOICES: Record<string, string> = {
  ar: "ar-EG-SalmaNeural",
  en: "en-US-AnaNeural",
};

const UA =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36";

async function googleFallback(text: string, lang: string): Promise<Buffer> {
  const chunks: string[] = [];
  let buf = "";
  for (const part of text.split(/([.!?؟،,]+\s*)/)) {
    if ((buf + part).length > 180 && buf) {
      chunks.push(buf);
      buf = part;
    } else buf += part;
  }
  if (buf) chunks.push(buf);
  const out: Buffer[] = [];
  for (let i = 0; i < chunks.length; i++) {
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(
      chunks[i]!,
    )}&tl=${lang}&total=${chunks.length}&idx=${i}&textlen=${chunks[i]!.length}&client=tw-ob`;
    const r = await fetch(url, {
      headers: { "User-Agent": UA, Referer: "https://translate.google.com/" },
    });
    if (!r.ok) throw new Error(`google_tts ${r.status}`);
    out.push(Buffer.from(await r.arrayBuffer()));
  }
  return Buffer.concat(out);
}

async function edgeNeural(text: string, lang: string): Promise<Buffer> {
  const tts = new MsEdgeTTS();
  await tts.setMetadata(VOICES[lang]!, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
  // Slower rate + slightly higher pitch suits young children
  const stream = tts.toStream(text, { rate: "-10%", pitch: "+5%" });
  const chunks: Buffer[] = [];
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("edge_timeout")), 12000);
    stream.audioStream.on("data", (c: Buffer) => chunks.push(c));
    stream.audioStream.on("end", () => {
      clearTimeout(timer);
      const buf = Buffer.concat(chunks);
      if (buf.length === 0) reject(new Error("edge_empty"));
      else resolve(buf);
    });
    stream.audioStream.on("error", (e: Error) => {
      clearTimeout(timer);
      reject(e);
    });
  });
}

router.get("/tts", async (req, res) => {
  const rawText = String(req.query["text"] ?? "").trim();
  const rawLang = String(req.query["lang"] ?? "en").toLowerCase();
  const text = rawText.slice(0, 500);
  const lang = rawLang === "ar" ? "ar" : "en";

  if (!text) {
    res.status(400).json({ error: "text required" });
    return;
  }

  try {
    let audio: Buffer;
    try {
      audio = await edgeNeural(text, lang);
    } catch (err) {
      req.log.warn({ err }, "edge tts failed, falling back to google");
      audio = await googleFallback(text, lang);
    }
    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Cache-Control", "public, max-age=86400");
    res.send(audio);
  } catch (err) {
    req.log.error({ err }, "tts proxy error");
    res.status(502).json({ error: "tts_failed" });
  }
});

export default router;
