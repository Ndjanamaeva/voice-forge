import axios from "axios";

const API_URL = import.meta.env.VITE_TTS_API_URL || "http://localhost:8000/tts";

export interface TTSResponse {
  audioUrl: string;
  isBlob: boolean;
}

export async function generateSpeech(text: string): Promise<TTSResponse> {
  try {
    const response = await axios.post(
      API_URL,
      { text },
      {
        responseType: "blob",
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 60000, // 60 seconds timeout
      }
    );

    // Check content type to determine response format
    const contentType = response.headers["content-type"] || "";

    // If it's JSON, try to extract audio_url
    if (contentType.includes("application/json")) {
      const text = await response.data.text();
      const json = JSON.parse(text);
      if (json.audio_url) {
        return { audioUrl: json.audio_url, isBlob: false };
      }
      throw new Error("Format de réponse JSON invalide");
    }

    // Otherwise, treat as binary audio data
    const blob = new Blob([response.data], { type: contentType || "audio/wav" });
    const audioUrl = URL.createObjectURL(blob);
    return { audioUrl, isBlob: true };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.code === "ECONNABORTED") {
        throw new Error("La requête a expiré. Veuillez réessayer.");
      }
      if (error.response) {
        const status = error.response.status;
        if (status === 400) {
          throw new Error("Texte invalide. Veuillez vérifier votre saisie.");
        }
        if (status === 500) {
          throw new Error("Erreur serveur. Veuillez réessayer plus tard.");
        }
        throw new Error(`Erreur ${status}: ${error.response.statusText}`);
      }
      if (error.request) {
        throw new Error(
          "Impossible de contacter le serveur. Vérifiez que l'API est en cours d'exécution."
        );
      }
    }
    throw new Error("Une erreur inattendue s'est produite.");
  }
}
