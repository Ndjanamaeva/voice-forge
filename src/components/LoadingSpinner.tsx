import { Loader2 } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center gap-3">
      <Loader2 className="h-5 w-5 animate-spin text-primary" />
      <span className="text-muted-foreground">Génération en cours...</span>
    </div>
  );
};

export default LoadingSpinner;
