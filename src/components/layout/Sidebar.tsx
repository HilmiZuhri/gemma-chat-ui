interface SidebarProps {
  onNewChat: () => void;
}

export const Sidebar = ({ onNewChat }: SidebarProps) => {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">G</div>
        <div>
          <h1>Gemma Chat</h1>
          <span>Personal AI playground</span>
        </div>
      </div>

      <button className="new-chat-button" onClick={onNewChat}>
        <span>＋</span> New chat
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
  );
};