// src/navigation/RootNavigator.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import { useAuth } from "../screens/auth/AuthContext";

export type RootStackParamList = {
    Auth: undefined;
    App: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
    const { user } = useAuth();

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {user ? (
                    <Stack.Screen name="App" component={AppStack} />
                ) : (
                    <Stack.Screen name="Auth" component={AuthStack} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootNavigator;
