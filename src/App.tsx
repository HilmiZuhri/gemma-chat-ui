import { useEffect, useRef, useState } from "react";
import type { Message } from "./types/chat";
import { chatService } from "./services/chatService";
import { MainLayout } from "./components/layout/MainLayout";
import { ChatContainer } from "./components/chat/ChatContainer";
import "./App.css";

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

  async function handleSendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    setInput("");
    setError("");

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const reply = await chatService.sendMessage(text);

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: reply,
        },
      ]);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while contacting the server.",
      );
    } finally {
      setLoading(false);
      textareaRef.current?.focus();
    }
  }

  async function handleNewChat() {
    if (loading) return;
    setError("");

    await chatService.resetSession();

    setMessages([]);
    setInput("");
    textareaRef.current?.focus();
  }

  return (
    <MainLayout onNewChat={() => void handleNewChat()}>
      <ChatContainer
        messages={messages}
        input={input}
        setInput={setInput}
        loading={loading}
        error={error}
        onDismissError={() => setError("")}
        onSendMessage={() => void handleSendMessage()}
        bottomRef={bottomRef}
        textareaRef={textareaRef}
      />
    </MainLayout>
  );
}

export default App;