import { Router, type IRouter } from "express";

const router: IRouter = Router();

const UA =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36";

function chunkText(text: string, maxLen = 180): string[] {
  if (text.length <= maxLen) return [text];
  const parts: string[] = [];
  const sentences = text.split(/([.!?؟،,]+\s*)/);
  let buf = "";
  for (const s of sentences) {
    if ((buf + s).length > maxLen && buf) {
      parts.push(buf);
      buf = s;
    } else {
      buf += s;
    }
  }
  if (buf) parts.push(buf);
  return parts;
}

async function fetchOne(text: string, lang: string, total: number, idx: number): Promise<Buffer> {
  const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(
    text,
  )}&tl=${lang}&total=${total}&idx=${idx}&textlen=${text.length}&client=tw-ob`;
  const r = await fetch(url, {
    headers: {
      "User-Agent": UA,
      Referer: "https://translate.google.com/",
      Accept: "audio/mpeg,*/*",
    },
  });
  if (!r.ok) throw new Error(`upstream ${r.status}`);
  return Buffer.from(await r.arrayBuffer());
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
    const chunks = chunkText(text);
    const buffers: Buffer[] = [];
    for (let i = 0; i < chunks.length; i++) {
      const buf = await fetchOne(chunks[i]!, lang, chunks.length, i);
      buffers.push(buf);
    }
    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Cache-Control", "public, max-age=86400");
    res.send(Buffer.concat(buffers));
  } catch (err) {
    req.log.error({ err }, "tts proxy error");
    res.status(502).json({ error: "tts_failed" });
  }
});

export default router;
