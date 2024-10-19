import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import GeneralNavigator from "./app/navigation/GeneralNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <GeneralNavigator />
    </NavigationContainer>
  );
}
