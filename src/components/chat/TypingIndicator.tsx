export const TypingIndicator = () => {
  return (
    <article className="message-row assistant">
      <div className="message-avatar">G</div>
      <div className="message-body">
        <div className="message-author">Gemma</div>
        <div className="typing-indicator">
          <span />
          <span />
          <span />
          <small>Thinking...</small>
        </div>
      </div>
    </article>
  );
};