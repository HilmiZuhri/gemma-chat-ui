import type { RefObject, KeyboardEvent } from "react";

interface ComposerProps {
  input: string;
  setInput: (value: string) => void;
  onSend: () => void;
  loading: boolean;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
}

export const Composer = ({
  input,
  setInput,
  onSend,
  loading,
  textareaRef,
}: ComposerProps) => {
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
        <button
          className="send-button"
          onClick={onSend}
          disabled={!input.trim() || loading}
          aria-label="Send message"
          title="Send message"
        >
          {loading ? "…" : "↑"}
        </button>
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