import type { RefObject, KeyboardEvent } from "react";
import { IconButton } from "../ui/IconButton";

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  onSend: () => void;
  loading: boolean;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
}

export const ChatInput = ({
  input,
  setInput,
  onSend,
  loading,
  textareaRef,
}: ChatInputProps) => {
  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      onSend();
    }
  }

  return (
    <footer className="composer-area">
      <div className="composer">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message Gemma..."
          rows={1}
          disabled={loading}
          aria-label="Message for Gemma"
        />
        <IconButton
          className="send-button"
          onClick={onSend}
          disabled={!input.trim() || loading}
          aria-label="Send message"
          title="Send message"
        >
          {loading ? "…" : "↑"}
        </IconButton>
      </div>
      <p className="composer-hint">
        Enter to send · Shift + Enter for new line
      </p>
      <p className="disclaimer">
        Gemma can make mistakes. Verify important information independently.
      </p>
    </footer>
  );
};