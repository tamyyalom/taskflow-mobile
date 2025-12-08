// src/navigation/RootNavigator.tsx
import React, { useState } from "react";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import { useAppTheme } from "../theme/ThemeProvider";

const RootNavigator: React.FC = () => {
    const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
    const { mode } = useAppTheme();

    const navTheme = mode === "dark" ? DarkTheme : DefaultTheme;

    return (
        <NavigationContainer theme={navTheme}>
            {isSignedIn ? (
                <AppStack />
            ) : (
                <AuthStack onLoginSuccess={() => setIsSignedIn(true)} />
            )}
        </NavigationContainer>
    );
};

export default RootNavigator;
