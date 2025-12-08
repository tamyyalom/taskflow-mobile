import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import Screen from "../../components/Screen";
import { useAppTheme } from "../../theme/ThemeProvider";

type Props = {
    onLoginSuccess?: () => void;
    onGoToRegister?: () => void;
};

const LoginScreen: React.FC<Props> = ({ onLoginSuccess, onGoToRegister }) => {
    const { theme } = useAppTheme();

    return (
        <Screen>
            <Text style={[styles.title, { color: theme.colors.text }]}>TaskFlow</Text>
            <Text style={[styles.subtitle, { color: theme.colors.mutedText }]}>
                Sign in to your workspace
            </Text>

            <TextInput
                placeholder="Email"
                placeholderTextColor={theme.colors.mutedText}
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
                style={[
                    styles.primaryButton,
                    { backgroundColor: theme.colors.primary },
                ]}
                onPress={onLoginSuccess}
            >
                <Text style={styles.primaryButtonLabel}>Sign in</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.linkButton} onPress={onGoToRegister}>
                <Text style={[styles.linkLabel, { color: theme.colors.primary }]}>
                    Create an account
                </Text>
            </TouchableOpacity>
        </Screen>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 32,
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

export default LoginScreen;
