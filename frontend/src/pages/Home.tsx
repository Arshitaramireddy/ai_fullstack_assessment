import type { Chat } from "@/services/api";
import { askAI, clearHistory, getHistory } from "@/services/api";
import { useEffect, useState } from "react";


/** shape coming back from the backend */
export interface Chat {
  _id: string;
  prompt: string;
  answer: string;
  ts: string;          // ISO string
}

export default function Home() {
  /* ---------- state ---------- */
  const [prompt,  setPrompt]  = useState("");
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState<string | null>(null);

  const [history, setHistory]     = useState<Chat[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  /* ---------- lifecycle ---------- */
  useEffect(() => {
    getHistory().then(setHistory).catch(console.error);
  }, []);

  /* ---------- handlers ---------- */
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const answer = await askAI(prompt.trim());
      const newChat: Chat = { _id: crypto.randomUUID(), prompt, answer, ts: new Date().toISOString() };
      setHistory([newChat, ...history]);
      setPrompt("");
    } catch (err: any) {
      setError(err?.message ?? "AI error");
    } finally {
      setLoading(false);
    }
  }

  async function handleClear() {
    try {
      await clearHistory();
      setHistory([]);
    } catch (err) {
      console.error(err);
    }
  }

  /* ---------- UI ---------- */
  return (
    <main className="min-h-screen flex flex-col items-center
                     bg-gradient-to-br from-sky-100 via-indigo-50 to-violet-100
                     text-slate-800 px-4">

      {/* hero */}
      <h1 className="mt-16 mb-10 text-4xl sm:text-5xl lg:text-6xl
                     font-extrabold tracking-tight text-center">
        <span className="block">AI&nbsp;Chat&nbsp;Demo</span>
        <span className="block text-xl font-medium mt-3 text-indigo-600">
          Ask anything, get an answer ✨
        </span>
      </h1>

      {/* prompt row */}
      <form onSubmit={handleSubmit} className="w-full max-w-2xl flex gap-4">
        <input
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder="Type your question…"
          className="flex-1 rounded-full bg-white/70 backdrop-blur
                     border border-indigo-200 px-6 py-4 text-lg
                     focus:outline-none focus:ring-4 focus:ring-indigo-300"
        />
        <button
          type="submit"
          className="shrink-0 rounded-full px-8 py-4 text-lg font-semibold
                     bg-indigo-600 text-white hover:bg-indigo-700
                     focus:outline-none focus:ring-4 focus:ring-indigo-300">
          {loading ? "…" : "Send"}
        </button>
      </form>

      {/* error banner */}
      {error && (
        <p className="mt-4 text-rose-600 font-medium">{error}</p>
      )}

      {/* spacer */}
      <div className="h-10" />

      {/* history toggle */}
      <button
        onClick={() => setShowHistory(!showHistory)}
        className="rounded-full px-8 py-3 bg-white/80 backdrop-blur
                   hover:bg-white shadow text-base font-medium">
        {showHistory ? "Hide history" : "Show history"}
      </button>

      {/* history list */}
      {showHistory && (
        <section className="w-full max-w-3xl mt-10 space-y-6">
          {history.map(chat => (
            <article key={chat._id} className="bg-white/60 p-6 rounded-lg shadow">
              <p className="font-semibold">You: {chat.prompt}</p>
              <p className="mt-2 whitespace-pre-wrap">AI: {chat.answer}</p>
              <time className="mt-2 block text-sm text-slate-500">
                {new Date(chat.ts).toLocaleString()}
              </time>
            </article>
          ))}

          {!!history.length && (
            <button
              onClick={handleClear}
              className="block ml-auto mt-2 text-sm text-rose-600 hover:underline">
              Clear history
            </button>
          )}
        </section>
      )}
    </main>
  );
}
