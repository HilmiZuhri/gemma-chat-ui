interface ErrorMessageProps {
  message: string;
  onDismiss: () => void;
}

export const ErrorMessage = ({ message, onDismiss }: ErrorMessageProps) => {
  if (!message) return null;

  return (
    <div className="error-banner">
      <span>{message}</span>
      <button onClick={onDismiss} aria-label="Dismiss error">
        ×
      </button>
    </div>
  );
};