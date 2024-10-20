import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Platform, StatusBar, View, Pressable, Image, ActivityIndicator } from 'react-native';
import { Canvas } from '@react-three/fiber/native';
import { Environment } from '@react-three/drei/native';
import Tts from 'react-native-tts';
import { startSpeechRecognition, stopSpeechRecognition, useSpeechRecognition } from "../services/SpeechRecognitionService";
import { fetchOpenAIResponse } from "../services/OpenAIService";
import microphoneIcon from "../../assets/images/microphone.png";
import axios from 'axios';
import Model from './Model';
import animationsPath from '../../assets/models/animations.glb';
import avatarPath from '../../assets/models/mariecurie.glb';
import ViewerWV from '../utils/ViewerVW';

let currentPhoneme = "";

export const DashboardScreen = () => {
  const modelRef = useRef<any>(null);
  const [animation, setAnimation] = useState('Idle');
  const { recognizing, transcript, clearTranscript } = useSpeechRecognition();
  const [isSpeaking, setSpeaking] = useState(false);
  const [modelName, setModelName] = useState("");
  const [isPressed, setIsPressed] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [currentModelObject, setCurrentModelObject] = useState<any>(null);

  useEffect(() => {
    StatusBar.setHidden(true, 'none');
    setupTTS();
  }, []);

  const setupTTS = async () => {
    if (Platform.OS === "android") {
      try {
        await Tts.setDefaultEngine("com.google.android.tts");
      } catch (error) {
        console.error("Error setting up TTS engine", error);
      }
    }
    setVoices();
  };

  const setVoices = async () => {
    try {
      if (Platform.OS === "ios") {
        Tts.setDefaultVoice('com.apple.ttsbundle.siri_Aaron_en-US_compact');
      } else {
        const voices = await Tts.voices();
        const defaultVoice = voices.find(voice => !voice.networkConnectionRequired && voice.language === "en-US");
        if (defaultVoice) {
          Tts.setDefaultVoice(defaultVoice.id);
        }
      }
    } catch (error) {
      console.error("Error setting TTS voices", error);
    }
  };

  const handleSpeechProcessing = async () => {
    if (!transcript) return;

    try {
      const aiResponse = await fetchOpenAIResponse([
        { role: 'user', content: 'If I ask for something like a car, please just return --car.' },
        { role: 'assistant', content: "Sure, I'll return: --car." },
        { role: 'user', content: transcript },
      ]);

      if (aiResponse.startsWith("--")) {
        const objectName = aiResponse.split("--")[1];
        setModelName(objectName);
        setShowLoader(true);
        fetchSimilarity(objectName);
      } else {
        playAudio(aiResponse);
        setShowLoader(false);
      }
    } catch (error) {
      console.error('Error processing speech with OpenAI:', error);
    } finally {
      clearTranscript();
    }
  };

  const fetchSimilarity = async (query: string) => {
    const url = 'https://objaverse-api.hal51.ai/similarity';
    try {
      const response = await axios.get(url, { params: { query, top_k: 1 } });
      setCurrentModelObject([{ filename: `${query}.glb`, link: response.data[0].download_url }]);
    } catch (error) {
      console.error('Error fetching similarity data:', error);
    }
  };

  const playAudio = async (text: string) => {
    currentPhoneme = "";

    Tts.addEventListener("tts-start", () => setSpeaking(true));
    Tts.addEventListener("tts-progress", (event) => processPhonemes(text, event));
    Tts.addEventListener("tts-finish", () => handleFinishSpeaking());

    Tts.speak(text);
  };

  const processPhonemes = (audioText: string, data: any) => {
    const { start, end } = data;
    const spokenPhrase = audioText.substring(start, end);
    const phonemes = textToPhonemes(spokenPhrase);
    processPhenomes(phonemes);
  };

  const processPhenomes = async (phonemes: string[]) => {
    for (const phoneme of phonemes) {
      currentPhoneme = phoneme;
      await delay(200); // Delay between phoneme transitions
    }
    currentPhoneme = ""; // Reset when done
  };

  const handleFinishSpeaking = () => {
    currentPhoneme = "";
    setSpeaking(false);
  };

  const handlePressIn = () => {
    if (isSpeaking) return;
    setIsPressed(true);
    startSpeechRecognition();
  };

  const handlePressOut = () => {
    setIsPressed(false);
    stopSpeechRecognition();
  };

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  useEffect(() => {
    if (!recognizing && transcript) handleSpeechProcessing();
  }, [recognizing, transcript]);

  const renderModel = () => (
    <View style={{ flexDirection: "row", flex: 1, backgroundColor: "#FFF" }}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={{ flex: 1, height: "100%", width: "100%" }}
      >
        <Canvas camera={{ position: [6, 0, 4], fov: 36 }}>
          <Suspense fallback={<ActivityIndicator size="large" color="#FFF" />}>
            <Environment preset="park" />
            <Model ref={modelRef} url={avatarPath} animationsUrl={animationsPath} animation={animation} />
          </Suspense>
        </Canvas>
        <Image
          style={{
            resizeMode: "contain",
            backgroundColor: "#000",
            position: "absolute",
            top: 32,
            left: 32,
            height: 26,
            width: 26,
            tintColor: !isPressed ? "#444" : "#FFF",
          }}
          source={microphoneIcon}
        />
      </Pressable>
      {modelName && !showLoader ? renderExternalModel() : showLoaderOrText()}
    </View>
  );

  const renderExternalModel = () => {
    const jsContent = currentModelObject ? `window.VIEWER.app.loadExternal(${JSON.stringify(currentModelObject)});` : "";
    return <ViewerWV injectedJavaScript={jsContent} fullScreen={true} />;
  };

  const showLoaderOrText = () => (
    <View style={{ backgroundColor: "#000", flex: 1 }}>
      {showLoader ? <ActivityIndicator size="large" color="#FFF" /> : <Text style={{ color: "#FFF" }}>No model loaded</Text>}
    </View>
  );

  return renderModel();
};
