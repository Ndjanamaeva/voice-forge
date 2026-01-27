import { CheckCircle2 } from "lucide-react";

const SuccessMessage = () => {
  return (
    <div className="animate-fade-in flex items-center gap-3 rounded-lg border border-success/30 bg-success/10 p-4">
      <CheckCircle2 className="h-5 w-5 text-success" />
      <p className="font-medium text-success">Audio généré avec succès !</p>
    </div>
  );
};

export default SuccessMessage;
