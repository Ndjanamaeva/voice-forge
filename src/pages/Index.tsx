import { useState, useEffect, useCallback } from "react";
import { AudioWaveform } from "lucide-react";
import TextInput from "@/components/TextInput";
import GenerateButton from "@/components/GenerateButton";
import AudioPlayer from "@/components/AudioPlayer";
import DownloadButton from "@/components/DownloadButton";
import ErrorMessage from "@/components/ErrorMessage";
import SuccessMessage from "@/components/SuccessMessage";
import LoadingSpinner from "@/components/LoadingSpinner";
import { generateSpeech, TTSResponse } from "@/lib/ttsApi";

const Index = () => {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [audioData, setAudioData] = useState<TTSResponse | null>(null);

  // Cleanup blob URL on unmount or when new audio is generated
  useEffect(() => {
    return () => {
      if (audioData?.isBlob && audioData.audioUrl) {
        URL.revokeObjectURL(audioData.audioUrl);
      }
    };
  }, [audioData]);

  const handleGenerate = useCallback(async () => {
    if (!text.trim()) {
      setError("Veuillez entrer du texte à synthétiser.");
      return;
    }

    // Cleanup previous blob URL
    if (audioData?.isBlob && audioData.audioUrl) {
      URL.revokeObjectURL(audioData.audioUrl);
    }

    setIsLoading(true);
    setError(null);
    setAudioData(null);

    try {
      const response = await generateSpeech(text);
      setAudioData(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur s'est produite.");
    } finally {
      setIsLoading(false);
    }
  }, [text, audioData]);

  return (
    <div className="min-h-screen bg-background px-4 py-8 sm:py-12">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="rounded-xl bg-primary/20 p-3">
              <AudioWaveform className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Synthèse Vocale
          </h1>
          <p className="mt-2 text-muted-foreground">
            Convertissez votre texte en audio de haute qualité
          </p>
        </div>

        {/* Main Card */}
        <div className="glass-card rounded-2xl p-6 sm:p-8">
          <div className="space-y-6">
            {/* Text Input */}
            <TextInput
              value={text}
              onChange={setText}
              disabled={isLoading}
            />

            {/* Generate Button */}
            <GenerateButton
              onClick={handleGenerate}
              isLoading={isLoading}
              disabled={!text.trim()}
            />

            {/* Loading State */}
            {isLoading && (
              <div className="py-4">
                <LoadingSpinner />
              </div>
            )}

            {/* Error Message */}
            {error && (
              <ErrorMessage
                message={error}
                onDismiss={() => setError(null)}
              />
            )}

            {/* Success State with Audio Player */}
            {audioData && !isLoading && (
              <div className="animate-fade-in space-y-4 border-t border-border pt-6">
                <SuccessMessage />
                <AudioPlayer audioUrl={audioData.audioUrl} />
                <DownloadButton
                  audioUrl={audioData.audioUrl}
                  filename="synthese-vocale.wav"
                />
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-muted-foreground">
          API: {import.meta.env.VITE_TTS_API_URL || "http://localhost:8000/tts"}
        </p>
      </div>
    </div>
  );
};

export default Index;
