import dotenv from "dotenv";
import OpenAI from "openai";
dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function askOpenAI(prompt: string): Promise<string> {
  if (!process.env.OPENAI_API_KEY)
    throw { status: 401, message: "OPENAI_API_KEY missing" };

  const resp = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
  });

  return resp.choices[0].message.content.trim();
}
