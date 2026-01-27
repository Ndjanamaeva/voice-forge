import { useEffect, useRef } from "react";
import { Type } from "lucide-react";

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const TextInput = ({ value, onChange, disabled }: TextInputProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  return (
    <div className="space-y-3">
      <label className="flex items-center gap-2 text-sm font-medium text-foreground">
        <Type className="h-4 w-4 text-primary" />
        Texte à synthétiser
      </label>
      <div className="input-glow rounded-lg transition-all duration-300">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          placeholder="Entrez le texte que vous souhaitez convertir en audio..."
          className="min-h-[200px] w-full resize-y rounded-lg border border-border bg-input p-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
      <p className="text-xs text-muted-foreground">
        {value.length} caractères
      </p>
    </div>
  );
};

export default TextInput;
