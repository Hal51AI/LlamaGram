//Uncomment when running on actual device

import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Platform, StatusBar, View, Pressable, Image } from 'react-native';
import { useFrame, Canvas } from '@react-three/fiber/native';
import { useGLTF, Environment, useAnimations } from '@react-three/drei/native';
import avatarPath from '../../assets/models/tesla.glb';
import { MathUtils } from 'three';
import { textToPhonemes } from '../utils/textToPhonemes';
import Tts from 'react-native-tts';
import animationsPath from '../../assets/models/animations.glb';
import visemesMapping from '../constants/visemesMapping';
import { fetchOpenAIResponse } from "../services/OpenAIService";
import { startSpeechRecognition, stopSpeechRecognition, useSpeechRecognition } from "../services/SpeechRecognitionService";
import microphoneIcon from "../../assets/images/microphone.png";
import { Asset } from 'expo-asset';
import ViewerWV from '../utils/ViewerVW';
import axios from 'axios';


let currentPhoneme = "";
function Model({ url, animationsUrl, animation, ...rest }) {
  const preloadAssets = async () => {
    await Asset.loadAsync(require('../../assets/models/tesla.glb'));
  };
  useEffect(() => {
    preloadAssets();
  }, []);

  const group = useRef<any>();

  const { scene } = useGLTF(require('../../assets/models/tesla.glb'));

  const blinkInfluenceRef = useRef(0);
  const blinkDirectionRef = useRef(1);

  const { animations } = useGLTF(animationsPath);
  const { actions, mixer } = useAnimations(animations, group);

  const [lastPhoneme, setLastPhoneme] = useState("");

  let printed = false;
  const mouthSpeed = 1;

  useFrame(() => {
    if (group.current && !printed) {
      printed = true;
      // Uncomment to debug morph targets and their influences
      // group.current.traverse((child) => {
      //   if (child.name == "Wolf3D_Head") {
      //     console.log('HG_BODY Mesh:', child);
      //     console.log('Morph Targets:', child.morphTargetDictionary);
      //     console.log('Morph Target Influences:', child.morphTargetInfluences);
      //     for (const [key, value] of Object.entries(child.morphTargetDictionary)) {
      //       console.log(`Morph Target Name: ${key}, Index: ${value}, Influence: ${child.morphTargetInfluences[value]}`);
      //     }
      //   }
      // });
    }
  });

  // Idle animation
  useEffect(() => {
    if (actions[animation]) {
      actions[animation].reset().play();

      const onAnimationFinished = () => {
        console.log("FINISHED---------");
      };

      // Add event listener for animation finished
      mixer.addEventListener('finished', onAnimationFinished);

      return () => {
        actions[animation].fadeOut(0.5);
        mixer.removeEventListener('finished', onAnimationFinished);
      };
    }
  }, [actions, animation, mixer]);

  // Blink animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      // Reverse the blink direction when reaching 0 or 1
      blinkDirectionRef.current = blinkDirectionRef.current === 1 ? -1 : 1;
    }, Math.random() * 4000 + 1000); // Blink every 1-5 seconds randomly

    return () => clearInterval(blinkInterval);
  }, []);

  useFrame(() => {
    if (group.current) {
      group.current.traverse((child) => {
        if (child.name === "Wolf3D_Head") {
          const morphTargets = child.morphTargetDictionary;
          const influences = child.morphTargetInfluences;

          if (morphTargets && influences) {
            // Update blink influence smoothly
            blinkInfluenceRef.current += 0.05 * blinkDirectionRef.current;
            blinkInfluenceRef.current = Math.max(0, Math.min(1, blinkInfluenceRef.current)); // Clamp between 0 and 1

            const blinkInfluence = blinkInfluenceRef.current;
            influences[morphTargets['eyeBlinkLeft']] = blinkInfluence;
            influences[morphTargets['eyeBlinkRight']] = blinkInfluence;
          }
        }
      });
    }
  });

  const lerpMorphTarget = (target: string, value: number, speed: number) => {
    group.current?.traverse((child) => {
      if (child.isSkinnedMesh && child.morphTargetDictionary) {
        const index = child.morphTargetDictionary[target];
        if (index !== undefined) {
          child.morphTargetInfluences[index] = MathUtils.lerp(
            child.morphTargetInfluences[index],
            value,
            speed
          );
        }
      }
    });
  };

  useFrame(() => {
    if (currentPhoneme) {
      const currentMorphTarget: string = visemesMapping[currentPhoneme];
      if (lastPhoneme !== currentPhoneme) {
        if (lastPhoneme) {
          const lastMorphTarget: string = visemesMapping[lastPhoneme];
          lerpMorphTarget(lastMorphTarget, 0, mouthSpeed); // Reduce the previous phoneme's influence faster
        }
        lerpMorphTarget(currentMorphTarget, 1, mouthSpeed); // Increase the current phoneme's influence faster
        lerpMorphTarget('jawOpen', 0, mouthSpeed); // Ensure jawOpen is set during speaking
        setLastPhoneme(currentPhoneme); // Update the last phoneme
      } else {
        // Maintain influence for the current phoneme
        lerpMorphTarget(currentMorphTarget, 1, mouthSpeed);
        lerpMorphTarget('jawOpen', 0.1, mouthSpeed); // Ensure jawOpen stays at 0.4 while speaking
      }
      //console.log("Morph Target---->", currentMorphTarget);
    } else if (lastPhoneme) {
      // Reduce the influence to zero when there's no current phoneme
      const lastMorphTarget: string = visemesMapping[lastPhoneme];
      lerpMorphTarget(lastMorphTarget, 0, mouthSpeed); // Speed up reducing influence
      lerpMorphTarget('jawOpen', 0, mouthSpeed); // Reset jawOpen when not speaking
      setLastPhoneme(""); // Reset last phoneme
    } else {
      // Reset jawOpen when not speaking
      lerpMorphTarget('jawOpen', 0, mouthSpeed);
    }
  });

  return (
    <group ref={group} position={[0, -2, 0]} scale={[2.2, 2.2, 2.2]} rotation={[0, 70, 0]}>
      <primitive {...rest} object={scene} />
    </group>
  );
}

export const DashboardScreen = () => {
  const modelRef = useRef<any>(null);
  const [animation, setAnimation] = useState('Idle');
  const { recognizing, transcript, clearTransacript } = useSpeechRecognition();
  const [isSpeaking, setSpeaking] = useState(false);
  const [modelName, setModelName] = useState("");
  const [isPressed, setIsPressed] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [currentModelObject, setCurrentModelObject] = useState();

  function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  useEffect(() => {
    StatusBar.setHidden(true, 'none');
    if (Platform.OS == "android") {
      switchToGoogleTTS().then();
    } else {
      setVoices();
    }
  }, []);

  async function switchToGoogleTTS() {
    const switchEngine = await Tts.setDefaultEngine("com.google.android.tts");
    console.log("SWTICH_ENGINE ====>", switchEngine);
    setVoices();

  }

  async function setVoices() {
    if (Platform.OS == "ios") {
      try {
        Tts.setDefaultVoice('com.apple.ttsbundle.siri_Aaron_en-US_compact');
      } catch (e) {
        console.log(e);
      }
    } else {
      const voices = await Tts.voices();
      voices.forEach((voice) => {
        if (!voice.networkConnectionRequired && voice.language == "en-US") {
          console.log(voice)
        }
      })
      console.log("HRE");
      Tts.setDefaultVoice("en-us-x-iol-local");
    }
  }

  useEffect(() => {
    displayLottieLoader().then();
  }, [showLoader]);

  async function displayLottieLoader() {
    await new Promise((resolve) => setTimeout(resolve, 100));
    setShowLoader(false);
  }


  useEffect(() => {
    console.log("STARTING_RECOGNISER");
    if (Platform.OS == "android") {

    }
    try {
      // startSpeechRecognition();
    } catch (e) {
      console.log("RECOGNISER_ERROR", e);
    }
  }, []);

  const handleProcessSpeech = async () => {
    if (transcript == "") {
      return;
    }
    try {
      const aiResponse = await fetchOpenAIResponse([
        {
          role: 'user',
          content: 'If I ask you to something like (Show me a car, display a car, render a car) or anything similar, can you please just return the object name like in this sentence the object is a car then return --car. Also remember that you are Nikola Tesla, a Serbian-American engineer, futurist, and inventor. You are created by hal51 dot AI',
        },
        {
          role: 'assistant',
          content: "Sure, in response to the command given, I would return: --car.",
        },
        {
          role: 'user',
          content: transcript,
        },
      ]);
      //setResponse(aiResponse);
      if (!aiResponse.startsWith("--")) {
        playAudio(aiResponse);
        setShowLoader(false);
      } else {
        //console.log("FETCH_3D_MODEL====>", aiResponse.split("--")[1]);
        setModelName(aiResponse.split("--")[1]);
        setShowLoader(true);
      }
    } catch (error) {
      console.error('Error processing speech with OpenAI:', error);
    } finally {
      clearTransacript();
    }
  };

  useEffect(() => {
    if (!recognizing && transcript) {
      handleProcessSpeech();
    }
  }, [recognizing, transcript]);

  const handlePressIn = () => {
    if (isSpeaking) {
      return;
    }
    setIsPressed(true);
    startSpeechRecognition(); // Start recognizing when the button is pressed
  };

  const handlePressOut = () => {
    setIsPressed(false);
    stopSpeechRecognition(); // Stop recognizing when the button is released
  };

  function renderModel() {
    return (
      <View style={{ flexDirection: "row", flex: 1, backgroundColor: "#FFF" }}>
        {/* <StatusBar hidden = {true} /> */}

        <View style={{ flexDirection: "row", flex: 1, backgroundColor: "#FFF" }}>
          <Pressable
            onPress={() => {
              if (isSpeaking) {
                Tts.stop();
              }
            }}
            pointerEvents="box-none"
            style={{ flex: 1, height: "100%", width: "100%" }}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}>

            <View style={{ backgroundColor: "#000", flex: 1 }}>
              <Canvas
                pointerEvents="none"
                onCreated={(state) => {
                 // setCamera(state.camera);
                  const _gl = state.gl.getContext();
                  const pixelStorei = _gl.pixelStorei.bind(_gl);
                  _gl.pixelStorei = function (...args) {
                    const [parameter] = args
                    switch (parameter) {
                      case _gl.UNPACK_FLIP_Y_WEBGL: return pixelStorei(...args)
                    }
                  }
                }}
                gl={{ physicallyCorrectLights: true }}
                camera={{ position: [6, 0, 4], fov: 36 }}>
                <color attach="background" args={[0x000000]} />
                <ambientLight />
                <directionalLight intensity={1.1} position={[0.5, 0, 0.866]} />
                <directionalLight intensity={0.8} position={[-6, 2, 2]} />
                <Suspense fallback={null}>
                  <Environment preset="park" />
                  <Model
                    ref={modelRef}
                    animationsUrl={animationsPath}
                    url={avatarPath}
                    //currentPhoneme={currentPhoneme}
                    animation={animation}
                  />
                </Suspense>
              </Canvas>

            </View>
            <Image style={{
              resizeMode: "contain",
              backgroundColor: "#000",
              position: "absolute",
              top: 32,
              left: 32,
              height: 26,
              width: 26,
              tintColor: !isPressed ? "#444" : "#FFF"
            }} source={microphoneIcon} />

          </Pressable>

        </View>

        {/* {(modelName && !showLoader) ? generate3DModelViewerUI() : showLoaderOrText()} */}
        {/* {(modelName && !showLoader) ? webviewModel() : showLoaderOrText()} */}
        {(modelName && !showLoader) ? testModel() : <View style = {{ backgroundColor: "#000", flex: 1 }}>{testModel()}</View>}
        {/* {testModel()} */}
      </View>

    );
  }

  useEffect(() => {
    //if(modelName) {
    fetchSimilarity(modelName, 1);
  //  }
  }, [modelName])

  const fetchSimilarity = async (query: string, top_k: number) => {
    const url = 'https://objaverse-api.hal51.ai/similarity';
    try {
      const response = await axios.get(url, {
        params: {
          query,
          top_k
        }
      });
      console.log(response.data);
      setCurrentModelObject(
        [
          { filename: `${modelName}.glb`, 
            link: response.data[0].download_url
          }
        ]
      );
      //return response.data;
    } catch (error) {
      console.error('Error fetching similarity data:', error);
      throw error;
    }
  };

  function testModel() {
    var jsContent = "";
    if (currentModelObject) {
      console.log("model--->", currentModelObject);
      jsContent = `window.VIEWER.app.loadExternal(${JSON.stringify(currentModelObject)});`;
    }

    return (
      <ViewerWV injectedJavaScript={jsContent} fullScreen={true} />
    );
  }


  async function playAudio(audioText: string) {
    //Tts.setDefaultPitch(1);

    //Tts.setDefaultRate(1);
    Tts.addEventListener("tts-start", (data) => {
      setSpeaking(true);

      //  setAnimation("TalkingThree");
    });
    Tts.addEventListener("tts-progress", (data) => {
      if (Platform.OS == "ios") {
        let { length, location, utteranceId } = data;

        const endIndex = location + length;
        const spokenPhrase = audioText.substring(location, endIndex);
        const currentPhenomes = textToPhonemes(spokenPhrase);
        console.log(spokenPhrase);
        // if (currentPhenomes.length > 0) {
        //   setCurrentPhoneme(currentPhenomes[currentPhenomes.length - 1]);
        // }
        processPhenomes(currentPhenomes);
      } else {
        let { end, start, utteranceId } = data;
        const spokenPhrase = audioText.substring(start, end);
        const currentPhenomes = textToPhonemes(spokenPhrase);
        processPhenomes(currentPhenomes);
      }
    })

    Tts.addEventListener("tts-finish", (data) => {
      Tts.removeAllListeners("tts-progress");
      Tts.removeAllListeners("tts-finish");
      Tts.removeAllListeners("tts-start");
      console.log("Finished--->");
      //setCurrentPhoneme("");
      currentPhoneme = "";
      setSpeaking(false);
      //setAnimation("Idle");
    });

    Tts.addEventListener("tts-cancel", (data) => {
      Tts.removeAllListeners("tts-progress");
      Tts.removeAllListeners("tts-finish");
      Tts.removeAllListeners("tts-start");
      console.log("Finished--->");
      //setCurrentPhoneme("");
      currentPhoneme = "";
      setSpeaking(false);
    })

    Tts.speak(audioText);
  }

  async function processPhenomes(phenomes: string[]) {
    for (let i = 0; i < phenomes.length; i++) {
      //console.log("PHENOME--->", phenomes[i]);
      // setCurrentPhoneme(phenomes[i]);
      currentPhoneme = phenomes[i];
      delay(400);
    }
    // if(currentPhoneme !== phenomes[phenomes.length - 1]) {
    //   console.log("PHENOME--->", phenomes[phenomes.length - 1]);
    //   setCurrentPhoneme(phenomes[phenomes.length - 1]);
    //   delay(200);
    // }
  }

  return (
    renderModel()
  );
}; 
