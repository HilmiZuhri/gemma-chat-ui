import type { RefObject } from "react";
import type { Message } from "../../types/chat";
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";

interface MessageListProps {
  messages: Message[];
  loading: boolean;
  bottomRef: RefObject<HTMLDivElement | null>;
}

export const MessageList = ({ messages, loading, bottomRef }: MessageListProps) => {
  return (
    <div className="message-list">
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
      {loading && <TypingIndicator />}
      <div ref={bottomRef} />
    </div>
  );
};