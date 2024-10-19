import { ExpoSpeechRecognitionModule, useSpeechRecognitionEvent } from "@jamsch/expo-speech-recognition";
import { useState } from "react";

export const startSpeechRecognition = () => {
  ExpoSpeechRecognitionModule.start({
    lang: "en-US",
    interimResults: true,
  });
};

export const stopSpeechRecognition = () => {
  ExpoSpeechRecognitionModule.stop();
};

export const useSpeechRecognition = () => {
  const [recognizing, setRecognizing] = useState(false);
  const [transcript, setTranscript] = useState("");

  const clearTransacript = () => {
    setTranscript("");
  }

  useSpeechRecognitionEvent("start", () => setRecognizing(true));
  useSpeechRecognitionEvent("end", () => setRecognizing(false));
  useSpeechRecognitionEvent("result", (event) => {
    setTranscript(event.results[0].transcript);
  });

  return { recognizing, transcript, clearTransacript };
};
