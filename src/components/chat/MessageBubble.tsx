import type { Message } from "../../types/chat";

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isUser = message.role === "user";

  return (
    <article className={`message-row ${message.role}`}>
      <div className="message-avatar">
        {isUser ? "U" : "G"}
      </div>
      <div className="message-body">
        <div className="message-author">
          {isUser ? "You" : "Gemma"}
        </div>
        <div className="message-content">
          {message.content}
        </div>
      </div>
    </article>
  );
};