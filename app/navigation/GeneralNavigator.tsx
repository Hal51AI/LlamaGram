import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SplashNavigator from "./SplashNavigator";
import DashboardNavigator from "./DashboardNavigator";

const Stack = createStackNavigator();

export default function GeneralNavigator() {
    return (
        <Stack.Navigator initialRouteName="SplashStack">
            <Stack.Screen
                name="SplashStack"
                component={SplashNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="DashboardStack"
                component={DashboardNavigator}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}
