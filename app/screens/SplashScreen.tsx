import React, { useEffect, useState } from "react";
import { View, Text, Image, StatusBar, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Audio } from "expo-av"; // Use expo-av for microphone permissions
import splashIcon from "../../assets/images/splash_icon.png";

export const SplashScreen = () => {
  const navigation = useNavigation<any>();
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    StatusBar.setHidden(true, "none");

    const checkMicrophonePermission = async () => {
      try {
        const { granted } = await Audio.requestPermissionsAsync(); // Use Audio for permission

        if (granted) {
          setPermissionGranted(true);
          navigation.replace("DashboardStack");
        } else {
          Alert.alert(
            "Permission required",
            "Microphone access is required to use this app."
          );
        }
      } catch (error) {
        console.error("Permission check failed", error);
      }
    };

    // Add delay before checking permission and navigating
    const splashTimeout = setTimeout(() => {
      checkMicrophonePermission();
    }, 3000);

    return () => clearTimeout(splashTimeout);
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
      }}
    >
      <View style={{ alignItems: "center" }}>
        <Image
          source={splashIcon}
          style={{ height: 100, width: 100, resizeMode: "contain" }}
        />
        <Text
          style={{
            color: "#FFF",
            fontSize: 32,
            fontWeight: "400",
            marginTop: 24,
          }}
        >
          LemurGram
        </Text>
      </View>
    </View>
  );
};
