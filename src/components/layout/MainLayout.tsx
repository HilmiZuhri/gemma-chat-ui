import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

interface MainLayoutProps {
  children: ReactNode;
  onNewChat: () => void;
}

export const MainLayout = ({ children, onNewChat }: MainLayoutProps) => {
  return (
    <div className="app-shell">
      <Sidebar onNewChat={onNewChat} />
      <main className="chat-panel">
        <Header />
        {children}
      </main>
    </div>
  );
};