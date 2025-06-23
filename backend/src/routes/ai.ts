import { Router } from "express";
import { askOpenAI } from "../services/openaiClient";
import { Chat } from "../services/db";

export const aiRouter = Router();

/* POST /api/ask-ai  ─ single prompt */
aiRouter.post("/ask-ai", async (req, res) => {
  const { prompt } = req.body as { prompt?: string };
  if (!prompt) return res.status(400).json({ detail: "Prompt required" });

  try {
    const answer = await askOpenAI(prompt);
    await Chat.create({ prompt, answer });     // save conversation
    res.json({ answer });
  } catch (err: any) {
    if (err.status) return res.status(err.status).json({ detail: err.message });
    console.error(err);
    res.status(500).json({ detail: "OpenAI error" });
  }
});

/* GET /api/conversations  ─ latest 50 Q&A */
aiRouter.get("/conversations", async (_, res) => {
  const rows = await Chat.find().sort({ ts: -1 }).limit(50).lean();
  res.json(rows);
});

/* DELETE /api/conversations  ─ clear history */
aiRouter.delete("/conversations", async (_, res) => {
  await Chat.deleteMany({});
  res.sendStatus(204);
});
