export const Header = () => {
  return (
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
  );
};