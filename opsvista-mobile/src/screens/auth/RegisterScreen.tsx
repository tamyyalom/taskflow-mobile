// src/screens/auth/RegisterScreen.tsx
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Screen from "../../components/Screen";
import { useAppTheme } from "../../theme/ThemeProvider";
import { AuthStackParamList } from "../../navigation/AuthStack";

type Props = NativeStackScreenProps<AuthStackParamList, "Register">;

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
    const { theme } = useAppTheme();

    // Optional: keep local state if you plan to submit later
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const goBackToLogin = () => navigation.goBack(); // or navigation.navigate("Login")

    const onSubmit = () => {
        // TODO: Implement register API call
        // For now, just go back to login (or show a message)
        goBackToLogin();
    };

    return (
        <Screen>
            <Text style={[styles.title, { color: theme.colors.text }]}>
                Create account
            </Text>
            <Text style={[styles.subtitle, { color: theme.colors.mutedText }]}>
                Start managing with OpsVista
            </Text>

            <TextInput
                placeholder="Name"
                placeholderTextColor={theme.colors.mutedText}
                value={name}
                onChangeText={setName}
                style={[
                    styles.input,
                    {
                        color: theme.colors.text,
                        borderColor: theme.colors.border,
                        backgroundColor: theme.colors.card,
                    },
                ]}
            />
            <TextInput
                placeholder="Email"
                placeholderTextColor={theme.colors.mutedText}
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                style={[
                    styles.input,
                    {
                        color: theme.colors.text,
                        borderColor: theme.colors.border,
                        backgroundColor: theme.colors.card,
                    },
                ]}
            />
            <TextInput
                placeholder="Password"
                placeholderTextColor={theme.colors.mutedText}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                style={[
                    styles.input,
                    {
                        color: theme.colors.text,
                        borderColor: theme.colors.border,
                        backgroundColor: theme.colors.card,
                    },
                ]}
            />

            <TouchableOpacity
                style={[styles.primaryButton, { backgroundColor: theme.colors.primary }]}
                onPress={onSubmit}
                accessibilityRole="button"
                accessibilityLabel="Sign up"
            >
                <Text style={styles.primaryButtonLabel}>Sign up</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.linkButton}
                onPress={goBackToLogin}
                accessibilityRole="button"
                accessibilityLabel="Back to sign in"
            >
                <Text style={[styles.linkLabel, { color: theme.colors.primary }]}>
                    Back to sign in
                </Text>
            </TouchableOpacity>
        </Screen>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 28,
        fontWeight: "700",
        marginTop: 40,
    },
    subtitle: {
        fontSize: 14,
        marginTop: 8,
        marginBottom: 24,
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
        marginBottom: 12,
    },
    primaryButton: {
        marginTop: 8,
        borderRadius: 10,
        paddingVertical: 12,
        alignItems: "center",
    },
    primaryButtonLabel: {
        color: "#FFFFFF",
        fontWeight: "600",
        fontSize: 16,
    },
    linkButton: {
        marginTop: 16,
        alignItems: "center",
    },
    linkLabel: {
        fontSize: 14,
        fontWeight: "500",
    },
});

export default RegisterScreen;
