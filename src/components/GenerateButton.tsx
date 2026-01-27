import { Mic, Loader2 } from "lucide-react";

interface GenerateButtonProps {
  onClick: () => void;
  isLoading: boolean;
  disabled?: boolean;
}

const GenerateButton = ({ onClick, isLoading, disabled }: GenerateButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading || disabled}
      className="glow-primary flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-4 font-semibold text-primary-foreground transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
    >
      {isLoading ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" />
          Génération en cours...
        </>
      ) : (
        <>
          <Mic className="h-5 w-5" />
          Générer la voix
        </>
      )}
    </button>
  );
};

export default GenerateButton;
