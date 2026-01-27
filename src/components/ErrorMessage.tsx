import { AlertCircle, X } from "lucide-react";

interface ErrorMessageProps {
  message: string;
  onDismiss: () => void;
}

const ErrorMessage = ({ message, onDismiss }: ErrorMessageProps) => {
  return (
    <div className="animate-fade-in flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/10 p-4">
      <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-destructive" />
      <div className="flex-1">
        <p className="font-medium text-destructive">Erreur</p>
        <p className="mt-1 text-sm text-destructive/80">{message}</p>
      </div>
      <button
        onClick={onDismiss}
        className="rounded-md p-1 text-destructive/60 transition-colors hover:bg-destructive/20 hover:text-destructive"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default ErrorMessage;
