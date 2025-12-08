// src/navigation/AuthStack.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";

export type AuthStackParamList = {
    Login: undefined;
    Register: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

type Props = {
    onLoginSuccess: () => void;
};

const AuthStack: React.FC<Props> = ({ onLoginSuccess }) => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login">
                {(props) => (
                    <LoginScreen
                        {...props}
                        onLoginSuccess={onLoginSuccess}
                        onGoToRegister={() => props.navigation.navigate("Register")}
                    />
                )}
            </Stack.Screen>
            <Stack.Screen name="Register">
                {(props) => (
                    <RegisterScreen
                        {...props}
                        onGoBackToLogin={() => props.navigation.replace("Login")}
                    />
                )}
            </Stack.Screen>
        </Stack.Navigator>
    );
};

export default AuthStack;
