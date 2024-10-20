import React, { useEffect, useState } from "react";
import { View, Text, Image, StatusBar, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Audio } from 'expo-av';  // Use expo-av for microphone permissions
import splashIcon from "../../assets/images/splash_icon.png";

export const SplashScreen = () => {
  const navigation = useNavigation<any>();
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    StatusBar.setHidden(true, "none");

    // Check microphone permission with delay
    const checkMicrophonePermission = async () => {
      const { granted } = await Audio.requestPermissionsAsync();  // Use Audio for permission
      
      if (granted) {
        setPermissionGranted(true);
      } else {
        Alert.alert("Permission required", "Microphone access is required to use this app.");
      }
    };

    // Add delay before checking permission and navigating
    const splashTimeout = setTimeout(() => {
      checkMicrophonePermission().then(() => {
        if (permissionGranted) {
          navigation.replace("DashboardStack");
        }
      });
    }, 3000);

    return () => clearTimeout(splashTimeout);
  }, [navigation, permissionGranted]);

  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
      }}
    >
      <View
        style={{
          alignSelf: "center",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <Image
          source={splashIcon}
          style={{ height: 100, width: 100, resizeMode: "contain" }}
        />
        <Text
          style={{
            color: "#FFF",
            fontSize: 32,
            fontWeight: "400",
            alignSelf: "center",
            marginTop: 24,
          }}
        >
          LemurGram
        </Text>
      </View>
    </View>
  );
};