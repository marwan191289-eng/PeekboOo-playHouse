import { Router, type IRouter } from "express";
import { GoogleGenAI } from "@google/genai";

const router: IRouter = Router();

const baseUrl = process.env["AI_INTEGRATIONS_GEMINI_BASE_URL"];
const apiKey = process.env["AI_INTEGRATIONS_GEMINI_API_KEY"];

if (!baseUrl || !apiKey) {
  throw new Error(
    "AI_INTEGRATIONS_GEMINI_BASE_URL and AI_INTEGRATIONS_GEMINI_API_KEY must be set",
  );
}

const ai = new GoogleGenAI({
  apiKey,
  httpOptions: { baseUrl },
});

type ChatMessage = { role: "user" | "assistant"; content: string };

router.post("/chat/stream", async (req, res) => {
  const messages: ChatMessage[] = Array.isArray(req.body?.messages)
    ? req.body.messages
    : [];
  const attachmentCount: number =
    typeof req.body?.attachmentCount === "number"
      ? req.body.attachmentCount
      : 0;

  if (messages.length === 0) {
    res.status(400).json({ error: "messages required" });
    return;
  }

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const systemPreamble = `You are "Peekaboo", a warm, playful, kid-friendly smart teacher and friend for children using the Peekaboo Play House app. Your tone is gentle, encouraging, and joyful — like a favorite kindergarten teacher.

CRITICAL RULES:
1. ALWAYS reply in the SAME language as the user's most recent message. If they write in Arabic (العربية), reply ONLY in Arabic with simple, kid-friendly words. If they write in English, reply only in English. If mixed, mirror their dominant language.
2. Keep answers SHORT (2-5 short sentences) unless they ask for a story.
3. For Arabic, use simple Modern Standard Arabic that small children can understand. Use playful words like "يا بطل", "يا حلو", "ممتاز", "أحسنت".
4. Use lots of emoji to make it fun. 🌟🎈🦁🍎
5. Always be encouraging — celebrate their questions and curiosity.
6. If asked educational questions (letters, numbers, colors, animals, songs, stories), answer in a fun, simple, child-appropriate way.
7. Never discuss anything inappropriate for young children (ages 3-8).
8. If asked to tell a story, make it short, magical, and end with a happy lesson.

You can help with: storytelling, songs, riddles, learning letters/numbers/colors/animals, fun facts, drawing ideas, and being a happy companion.`;

  const contents = messages.map((m, idx) => {
    let text = m.content;
    if (idx === messages.length - 1 && m.role === "user") {
      const attachmentNote =
        attachmentCount > 0
          ? `\n(The user attached ${attachmentCount} file${attachmentCount === 1 ? "" : "s"})`
          : "";
      text = `${systemPreamble}\n\nUser: ${text}${attachmentNote}`;
    }
    return {
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text }],
    };
  });

  try {
    const stream = await ai.models.generateContentStream({
      model: "gemini-2.5-flash",
      contents,
      config: { maxOutputTokens: 8192 },
    });

    for await (const chunk of stream) {
      const text = chunk.text;
      if (text) {
        res.write(`data: ${JSON.stringify({ content: text })}\n\n`);
      }
    }

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (err) {
    req.log.error({ err }, "chat stream failed");
    if (!res.headersSent) {
      res.status(500).json({ error: "chat failed" });
    } else {
      res.write(
        `data: ${JSON.stringify({ error: "Oops! The magic ran into a hiccup." })}\n\n`,
      );
      res.end();
    }
  }
});

export default router;
