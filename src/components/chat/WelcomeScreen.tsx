import { SuggestedPrompts } from "./SuggestedPrompts";

interface WelcomeScreenProps {
  onSelectPrompt: (prompt: string) => void;
}

export const WelcomeScreen = ({ onSelectPrompt }: WelcomeScreenProps) => {
  return (
    <div className="welcome">
      <div className="welcome-icon">✳</div>
      <p className="eyebrow">YOUR AI WORKSPACE</p>
      <h2>
        How can I help<br />you today?
      </h2>
      <p className="welcome-description">
        Start a conversation, ask anything, or use Gemma to explore and brainstorm ideas.
      </p>

      <SuggestedPrompts onSelect={onSelectPrompt} />
    </div>
  );
};