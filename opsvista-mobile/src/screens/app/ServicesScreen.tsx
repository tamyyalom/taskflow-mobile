// src/screens/app/ServicesScreen.tsx
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
import { ApiService, ServiceStatus } from "../../types/api";
import { fetchServices } from "../../types/client";

type Props = {
    environmentId?: string;
    environmentName?: string;
    onOpenService?: (serviceId: string) => void;
};

const statusColor = (status: ServiceStatus, colors: any) => {
    switch (status) {
        case "healthy":
            return "#16A34A";
        case "degraded":
            return "#CA8A04";
        case "down":
            return "#DC2626";
        default:
            return colors.mutedText;
    }
};

const ServicesScreen: React.FC<Props> = ({
    environmentId,
    environmentName,
    onOpenService,
}) => {
    const { theme } = useAppTheme();
    const [loading, setLoading] = useState(false);
    const [services, setServices] = useState<ApiService[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        (async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await fetchServices(environmentId);
                if (!cancelled) {
                    setServices(data);
                }
            } catch (e: any) {
                if (!cancelled) {
                    console.error("Failed to fetch services", e);
                    setError("Failed to load services");
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [environmentId]);

    return (
        <Screen>
            <Text style={[styles.title, { color: theme.colors.text }]}>
                {environmentName ?? "Services"}
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
                    data={services}
                    keyExtractor={(item: ApiService) => item.id}
                    contentContainerStyle={styles.listContent}
                    renderItem={({ item }: { item: ApiService }) => (
                        <TouchableOpacity
                            style={[
                                styles.card,
                                {
                                    backgroundColor: theme.colors.card,
                                    borderColor: theme.colors.border,
                                },
                            ]}
                            onPress={() => onOpenService?.(item.id)}
                        >
                            <View style={styles.cardHeader}>
                                <View
                                    style={[
                                        styles.statusDot,
                                        { backgroundColor: statusColor(item.status, theme.colors) },
                                    ]}
                                />
                                <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
                                    {item.name}
                                </Text>
                            </View>
                            {item.description ? (
                                <Text
                                    style={[
                                        styles.cardSubtitle,
                                        { color: theme.colors.mutedText },
                                    ]}
                                >
                                    {item.description}
                                </Text>
                            ) : null}
                            <Text
                                style={[
                                    styles.statusText,
                                    { color: statusColor(item.status, theme.colors) },
                                ]}
                            >
                                {item.status.toUpperCase()}
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
        fontSize: 22,
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
    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 4,
    },
    statusDot: {
        width: 10,
        height: 10,
        borderRadius: 999,
        marginRight: 8,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "600",
    },
    cardSubtitle: {
        fontSize: 13,
        marginTop: 2,
    },
    statusText: {
        marginTop: 8,
        fontSize: 12,
        fontWeight: "600",
    },
    errorText: {
        marginTop: 16,
        fontSize: 14,
    },
});

export default ServicesScreen;
