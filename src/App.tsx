
import { useEffect, useRef, useState } from "react";
import "./App.css";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage() {
    const text = input.trim();

    if (!text || loading) return;

    if (!API_URL) {
      setError("URL API belum diatur. Periksa file .env.local.");
      return;
    }

    setInput("");
    setError("");

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
    };

    setMessages((previous) => [...previous, userMessage]);
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
          max_new_tokens: 256,
        }),
      });

      if (!response.ok) {
        const details = await response.text();
        throw new Error(`API ${response.status}: ${details}`);
      }

      const data: { reply: string } = await response.json();

      setMessages((previous) => [
        ...previous,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: data.reply,
        },
      ]);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat menghubungi API.",
      );
    } finally {
      setLoading(false);
      textareaRef.current?.focus();
    }
  }

  async function newChat() {
    if (loading) return;

    setError("");

    try {
      if (API_URL) {
        await fetch(`${API_URL}/reset`, { method: "POST" });
      }
    } catch {
      // UI tetap dapat direset jika API sedang tidak tersedia.
    }

    setMessages([]);
    setInput("");
    textareaRef.current?.focus();
  }

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLTextAreaElement>,
  ) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void sendMessage();
    }
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">G</div>
          <div>
            <h1>Gemma Chat</h1>
            <span>Personal AI playground</span>
          </div>
        </div>

        <button className="new-chat-button" onClick={() => void newChat()}>
          <span>＋</span> Percakapan baru
        </button>

        <div className="sidebar-section">
          <p className="section-label">MODEL</p>
          <div className="model-card">
            <div className="status-dot" />
            <div>
              <strong>Gemma 3 1B</strong>
              <span>Google · Instruction tuned</span>
            </div>
          </div>
        </div>

        <div className="sidebar-bottom">
          <div className="avatar">AI</div>
          <div>
            <strong>Local Playground</strong>
            <span>Powered by Colab API</span>
          </div>
        </div>
      </aside>

      <main className="chat-panel">
        <header className="topbar">
          <div>
            <span className="mobile-brand">GEMMA CHAT</span>
            <h2>AI Assistant</h2>
          </div>
          <div className="connection-status">
            <span className="status-dot" />
            <span>API playground</span>
          </div>
        </header>

        <section className="conversation">
          {messages.length === 0 ? (
            <div className="welcome">
              <div className="welcome-icon">✳</div>
              <p className="eyebrow">YOUR AI WORKSPACE</p>
              <h2>Ada yang bisa<br />aku bantu?</h2>
              <p className="welcome-description">
                Mulai percakapan, tanyakan sesuatu, atau gunakan Gemma
                untuk membantu mengeksplorasi ide.
              </p>

              <div className="suggestion-grid">
                {[
                  "Jelaskan konsep API dengan sederhana",
                  "Bantu aku belajar Python",
                  "Berikan ide project web",
                ].map((suggestion) => (
                  <button
                    className="suggestion"
                    key={suggestion}
                    onClick={() => setInput(suggestion)}
                  >
                    <span>{suggestion}</span>
                    <span className="suggestion-arrow">↗</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="message-list">
              {messages.map((message) => (
                <article
                  className={`message-row ${message.role}`}
                  key={message.id}
                >
                  <div className="message-avatar">
                    {message.role === "user" ? "K" : "G"}
                  </div>
                  <div className="message-body">
                    <div className="message-author">
                      {message.role === "user" ? "Kamu" : "Gemma"}
                    </div>
                    <div className="message-content">
                      {message.content}
                    </div>
                  </div>
                </article>
              ))}

              {loading && (
                <article className="message-row assistant">
                  <div className="message-avatar">G</div>
                  <div className="message-body">
                    <div className="message-author">Gemma</div>
                    <div className="typing-indicator">
                      <span />
                      <span />
                      <span />
                      <small>Sedang berpikir...</small>
                    </div>
                  </div>
                </article>
              )}
              <div ref={bottomRef} />
            </div>
          )}

          {error && (
            <div className="error-banner">
              <span>{error}</span>
              <button onClick={() => setError("")} aria-label="Tutup error">
                ×
              </button>
            </div>
          )}
        </section>

        <footer className="composer-area">
          <div className="composer">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Kirim pesan ke Gemma..."
              rows={1}
              disabled={loading}
              aria-label="Pesan untuk Gemma"
            />
            <button
              className="send-button"
              onClick={() => void sendMessage()}
              disabled={!input.trim() || loading}
              aria-label="Kirim pesan"
              title="Kirim pesan"
            >
              {loading ? "…" : "↑"}
            </button>
          </div>
          <p className="composer-hint">
            Enter untuk mengirim · Shift + Enter untuk baris baru
          </p>
          <p className="disclaimer">
            Gemma dapat memberikan jawaban yang kurang tepat. Periksa
            informasi penting secara mandiri.
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;
