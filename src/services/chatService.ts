import type { ChatApiResponse } from "../types/chat";

const API_URL = import.meta.env.VITE_API_URL;

export const chatService = {
  async sendMessage(message: string, maxTokens: number = 256): Promise<string> {
    if (!API_URL) {
      throw new Error("API URL is not configured. Please check your .env.local file.");
    }

    const response = await fetch(`${API_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        max_new_tokens: maxTokens,
      }),
    });

    if (!response.ok) {
      const details = await response.text();
      throw new Error(`API Error ${response.status}: ${details}`);
    }

    const data: ChatApiResponse = await response.json();
    return data.reply;
  },

  async resetSession(): Promise<void> {
    if (!API_URL) return;

    try {
      await fetch(`${API_URL}/reset`, { method: "POST" });
    } catch {
      // Allow fallback if API fails
    }
  },
};