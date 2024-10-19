import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { SplashScreen } from "../screens/SplashScreen";

const Stack = createStackNavigator();

const SplashNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SplashScreen"
        component= {SplashScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default SplashNavigator;