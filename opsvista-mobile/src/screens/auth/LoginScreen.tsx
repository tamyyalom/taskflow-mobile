// src/screens/auth/LoginScreen.tsx
import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useAppTheme } from "../../theme/ThemeProvider";
import { useAuth } from "./AuthContext";
import { AuthStackParamList } from "../../navigation/AuthStack";

type Props = NativeStackScreenProps<AuthStackParamList, "Login">;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
    const { theme } = useAppTheme();
    const { login } = useAuth();

    const [email, setEmail] = useState("admin@opsvista.local");
    const [password, setPassword] = useState("123456");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const goToRegister = () => navigation.navigate("Register");

    const onSubmit = async () => {
        try {
            setLoading(true);
            setError(null);

            await login(email, password);
        } catch (e: unknown) {
            console.error("Login failed", e);

            const msg =
                (e as any)?.response?.data?.error ??
                (e instanceof Error ? e.message : null) ??
                "Login failed. Please try again.";

            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Text style={[styles.title, { color: theme.colors.text }]}>OpsVista</Text>
            <Text style={[styles.subtitle, { color: theme.colors.mutedText }]}>
                Sign in to continue
            </Text>

            <TextInput
                style={[
                    styles.input,
                    { color: theme.colors.text, borderColor: theme.colors.border },
                ]}
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                placeholderTextColor={theme.colors.mutedText}
                editable={!loading}
            />

            <TextInput
                style={[
                    styles.input,
                    { color: theme.colors.text, borderColor: theme.colors.border },
                ]}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                placeholderTextColor={theme.colors.mutedText}
                editable={!loading}
            />

            {error ? (
                <Text style={[styles.errorText, { color: theme.colors.danger }]}>
                    {error}
                </Text>
            ) : null}

            <TouchableOpacity
                style={[styles.button, { backgroundColor: theme.colors.primary }]}
                onPress={onSubmit}
                disabled={loading}
                accessibilityRole="button"
                accessibilityLabel="Sign in"
            >
                {loading ? (
                    <ActivityIndicator color="#FFFFFF" />
                ) : (
                    <Text style={[styles.buttonText, { color: "#FFFFFF" }]}>Sign in</Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity onPress={goToRegister} disabled={loading}>
                <Text style={[styles.linkText, { color: theme.colors.primary }]}>
                    Create account
                </Text>
            </TouchableOpacity>

            <Text style={[styles.hint, { color: theme.colors.mutedText }]}>
                Try emails like:
                {"\n"}admin@opsvista.local (admin)
                {"\n"}operator@opsvista.local (operator)
                {"\n"}user@opsvista.local (viewer)
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        justifyContent: "center",
    },
    title: {
        fontSize: 28,
        fontWeight: "700",
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        marginBottom: 24,
    },
    input: {
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom: 12,
    },
    button: {
        marginTop: 8,
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: "center",
    },
    buttonText: {
        fontSize: 15,
        fontWeight: "600",
    },
    linkText: {
        marginTop: 16,
        textAlign: "center",
        fontSize: 14,
        fontWeight: "500",
    },
    errorText: {
        marginTop: 4,
        marginBottom: 4,
        fontSize: 13,
    },
    hint: {
        marginTop: 16,
        fontSize: 12,
    },
});

export default LoginScreen;
