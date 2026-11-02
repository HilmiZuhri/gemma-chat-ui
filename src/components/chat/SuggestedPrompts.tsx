interface SuggestedPromptsProps {
  onSelect: (prompt: string) => void;
}

const DEFAULT_SUGGESTIONS = [
  "Explain API concepts simply",
  "Help me learn Python",
  "Give me web project ideas",
];

export const SuggestedPrompts = ({ onSelect }: SuggestedPromptsProps) => {
  return (
    <div className="suggestion-grid">
      {DEFAULT_SUGGESTIONS.map((suggestion) => (
        <button
          key={suggestion}
          className="suggestion"
          onClick={() => onSelect(suggestion)}
        >
          <span>{suggestion}</span>
          <span className="suggestion-arrow">↗</span>
        </button>
      ))}
    </div>
  );
};