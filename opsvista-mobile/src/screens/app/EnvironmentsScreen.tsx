// src/screens/app/EnvironmentsScreen.tsx
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Screen from "../../components/Screen";
import { useAppTheme } from "../../theme/ThemeProvider";
import { ApiEnvironment } from "../../types/api";
import { fetchEnvironments } from "../../types/client";

type Props = {
    onSelectEnvironment?: (env: ApiEnvironment) => void;
};

const EnvironmentsScreen: React.FC<Props> = ({ onSelectEnvironment }) => {
    const { theme } = useAppTheme();
    const [loading, setLoading] = useState(false);
    const [envs, setEnvs] = useState<ApiEnvironment[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        (async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await fetchEnvironments();
                if (!cancelled) {
                    setEnvs(data);
                }
            } catch (e: any) {
                if (!cancelled) {
                    console.error("Failed to fetch environments", e);
                    setError("Failed to load environments");
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <Screen>
            <Text style={[styles.title, { color: theme.colors.text }]}>
                Environments
            </Text>

            {loading && (
                <View style={styles.center}>
                    <ActivityIndicator />
                </View>
            )}

            {error && !loading && (
                <Text style={[styles.errorText, { color: theme.colors.danger }]}>
                    {error}
                </Text>
            )}

            {!loading && !error && (
                <FlatList
                    data={envs}
                    keyExtractor={(item: ApiEnvironment) => item.id}
                    contentContainerStyle={styles.listContent}
                    renderItem={({ item }: { item: ApiEnvironment }) => (
                        <TouchableOpacity
                            style={[
                                styles.card,
                                {
                                    backgroundColor: theme.colors.card,
                                    borderColor: theme.colors.border,
                                },
                            ]}
                            onPress={() => onSelectEnvironment?.(item)}
                        >
                            <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
                                {item.name}
                            </Text>
                            <Text
                                style={[
                                    styles.cardSubtitle,
                                    { color: theme.colors.mutedText },
                                ]}
                            >
                                {item.isActive ? "Active" : "Inactive"}
                            </Text>
                        </TouchableOpacity>
                    )}
                />
            )}
        </Screen>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: "700",
        marginTop: 12,
        marginBottom: 16,
    },
    center: {
        marginTop: 24,
    },
    listContent: {
        paddingBottom: 16,
    },
    card: {
        borderWidth: 1,
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "600",
    },
    cardSubtitle: {
        fontSize: 13,
        marginTop: 4,
    },
    errorText: {
        marginTop: 16,
        fontSize: 14,
    },
});

export default EnvironmentsScreen;
