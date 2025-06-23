import axios from "axios";

export const api = axios.create({
  baseURL: "/api",            // Vite proxy → http://localhost:8000
});

export type Chat = { _id?: string; prompt: string; answer: string; ts: string };

export const askAI = (prompt: string) =>
  api.post<{ answer: string }>("/ask-ai", { prompt }).then(r => r.data.answer);

export const getHistory = () =>
  api.get<Chat[]>("/conversations").then(r => r.data);

export const clearHistory = () => api.delete("/conversations");
