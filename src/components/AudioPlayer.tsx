import { Volume2 } from "lucide-react";

interface AudioPlayerProps {
  audioUrl: string;
}

const AudioPlayer = ({ audioUrl }: AudioPlayerProps) => {
  return (
    <div className="space-y-3">
      <label className="flex items-center gap-2 text-sm font-medium text-foreground">
        <Volume2 className="h-4 w-4 text-primary" />
        Écouter le résultat
      </label>
      <audio
        controls
        src={audioUrl}
        className="w-full rounded-lg"
        style={{
          filter: "invert(1) hue-rotate(180deg)",
        }}
      >
        Votre navigateur ne supporte pas l'élément audio.
      </audio>
    </div>
  );
};

export default AudioPlayer;
