import type { RefObject } from "react";
import type { Message } from "../../types/chat";
import { WelcomeScreen } from "./WelcomeScreen";
import { MessageList } from "./MessageList";
import { ChatInput } from "./ChatInput";
import { ErrorMessage } from "../ui/ErrorMessage";

interface ChatContainerProps {
  messages: Message[];
  input: string;
  setInput: (val: string) => void;
  loading: boolean;
  error: string;
  onDismissError: () => void;
  onSendMessage: () => void;
  bottomRef: RefObject<HTMLDivElement | null>;
  textareaRef: RefObject<HTMLTextAreaElement | null>;
}

export const ChatContainer = ({
  messages,
  input,
  setInput,
  loading,
  error,
  onDismissError,
  onSendMessage,
  bottomRef,
  textareaRef,
}: ChatContainerProps) => {
  return (
    <>
      <section className="conversation">
        {messages.length === 0 ? (
          <WelcomeScreen onSelectPrompt={(prompt) => setInput(prompt)} />
        ) : (
          <MessageList
            messages={messages}
            loading={loading}
            bottomRef={bottomRef}
          />
        )}

        <ErrorMessage message={error} onDismiss={onDismissError} />
      </section>

      <ChatInput
        input={input}
        setInput={setInput}
        onSend={onSendMessage}
        loading={loading}
        textareaRef={textareaRef}
      />
    </>
  );
};