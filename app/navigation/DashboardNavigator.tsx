// DashboardNavigator.tsx
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { DashboardScreen } from "../screens/DashboardScreen";

const Stack = createStackNavigator();

const DashboardNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DashboardScreen"
        component={DashboardScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default DashboardNavigator;
