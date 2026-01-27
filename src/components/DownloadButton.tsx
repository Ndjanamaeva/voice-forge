import { Download } from "lucide-react";

interface DownloadButtonProps {
  audioUrl: string;
  filename?: string;
}

const DownloadButton = ({ audioUrl, filename = "audio.wav" }: DownloadButtonProps) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = audioUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={handleDownload}
      className="flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-secondary px-4 py-3 font-medium text-secondary-foreground transition-all hover:bg-secondary/80 hover:border-primary/50"
    >
      <Download className="h-5 w-5" />
      Télécharger l'audio
    </button>
  );
};

export default DownloadButton;
