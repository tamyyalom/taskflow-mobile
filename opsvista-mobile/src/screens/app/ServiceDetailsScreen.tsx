// src/screens/app/ServiceDetailsScreen.tsx
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
import {
    ApiEvent,
    ApiService,
    ServiceAction,
    ServiceStatus,
} from "../../types/api";
import { fetchServiceById, fetchServiceEvents, triggerServiceAction } from "../../types/client";
import { useAuth } from "../auth/AuthContext";


type Props = {
    serviceId: string;
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

const ServiceDetailsScreen: React.FC<Props> = ({ serviceId }) => {
    const { theme } = useAppTheme();
    const { role } = useAuth();
    const [service, setService] = useState<ApiService | null>(null);
    const [events, setEvents] = useState<ApiEvent[]>([]);
    const [loadingService, setLoadingService] = useState(false);
    const [loadingEvents, setLoadingEvents] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [actionLoading, setActionLoading] = useState(false);
    const [actionError, setActionError] = useState<string | null>(null);
    const canOperate = role === "admin" || role === "operator";
    const disabled = actionLoading || !canOperate;

    useEffect(() => {
        let cancelled = false;

        (async () => {
            try {
                setLoadingService(true);
                setError(null);
                const data = await fetchServiceById(serviceId);
                if (!cancelled) {
                    setService(data);
                }
            } catch (e: any) {
                if (!cancelled) {
                    setError("Failed to load service details");
                }
            } finally {
                if (!cancelled) {
                    setLoadingService(false);
                }
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [serviceId]);

    useEffect(() => {
        let cancelled = false;

        (async () => {
            try {
                setLoadingEvents(true);
                const data = await fetchServiceEvents(serviceId);
                if (!cancelled) {
                    setEvents(data);
                }
            } catch (e: any) {
                if (!cancelled) {
                    setError((prev) => prev ?? "Failed to load events");
                }
            } finally {
                if (!cancelled) {
                    setLoadingEvents(false);
                }
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [serviceId]);

    const runAction = async (action: ServiceAction) => {
        if (!service) return;

        try {
            setActionLoading(true);
            setActionError(null);
            const { event, updatedService } = await triggerServiceAction(
                serviceId,
                action
            );

            setService(updatedService);
            setEvents((prev) => [event, ...prev]);
        } catch (e: any) {
            console.error("Action failed", e);
            const msg =
                e?.response?.data?.error ??
                "Action failed. Please try again.";
            setActionError(msg);
        } finally {
            setActionLoading(false);
        }
    };

    return (
        <Screen>
            {loadingService && !service && (
                <View style={styles.center}>
                    <ActivityIndicator />
                </View>
            )}

            {error && !loadingService && !service && (
                <Text style={[styles.errorText, { color: theme.colors.danger }]}>
                    {error}
                </Text>
            )}

            {service && (
                <View style={styles.header}>
                    <View style={styles.headerTitleRow}>
                        <View
                            style={[
                                styles.statusDot,
                                { backgroundColor: statusColor(service.status, theme.colors) },
                            ]}
                        />
                        <Text style={[styles.title, { color: theme.colors.text }]}>
                            {service.name}
                        </Text>
                    </View>
                    {service.description ? (
                        <Text
                            style={[
                                styles.subtitle,
                                { color: theme.colors.mutedText },
                            ]}
                        >
                            {service.description}
                        </Text>
                    ) : null}
                    <Text
                        style={[
                            styles.statusText,
                            { color: statusColor(service.status, theme.colors) },
                        ]}
                    >
                        {service.status.toUpperCase()}
                    </Text>

                    {/* Action buttons */}
                    <View style={styles.actionsRow}>
                        <TouchableOpacity
                            style={[
                                styles.actionButton,
                                { backgroundColor: theme.colors.card },
                            ]}
                            disabled={actionLoading}
                            onPress={() => runAction("restart")}
                        >
                            <Text
                                style={[
                                    styles.actionText,
                                    { color: theme.colors.text },
                                ]}
                            >
                                Restart
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.actionButton,
                                { backgroundColor: theme.colors.card },
                            ]}
                            disabled={actionLoading}
                            onPress={() => runAction("pause")}
                        >
                            <Text
                                style={[
                                    styles.actionText,
                                    { color: theme.colors.text },
                                ]}
                            >
                                Pause
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.actionButton,
                                { backgroundColor: theme.colors.card },
                            ]}
                            disabled={actionLoading}
                            onPress={() => runAction("resume")}
                        >
                            <Text
                                style={[
                                    styles.actionText,
                                    { color: theme.colors.text },
                                ]}
                            >
                                Resume
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {actionLoading && (
                        <Text
                            style={[
                                styles.actionInfo,
                                { color: theme.colors.mutedText },
                            ]}
                        >
                            Running action...
                        </Text>
                    )}
                    {actionError && (
                        <Text
                            style={[
                                styles.actionError,
                                { color: theme.colors.danger },
                            ]}
                        >
                            {actionError}
                        </Text>
                    )}
                </View>
            )}

            <Text
                style={[
                    styles.sectionTitle,
                    { color: theme.colors.text },
                ]}
            >
                Events
            </Text>

            {loadingEvents && (
                <View style={styles.center}>
                    <ActivityIndicator />
                </View>
            )}

            {!loadingEvents && events.length === 0 && (
                <Text
                    style={[
                        styles.noEventsText,
                        { color: theme.colors.mutedText },
                    ]}
                >
                    No events yet for this service.
                </Text>
            )}

            {!loadingEvents && events.length > 0 && (
                <FlatList
                    data={events}
                    keyExtractor={(item: ApiEvent) => item.id}
                    contentContainerStyle={styles.eventsList}
                    renderItem={({ item }: { item: ApiEvent }) => (
                        <View
                            style={[
                                styles.eventCard,
                                {
                                    backgroundColor: theme.colors.card,
                                    borderColor: theme.colors.border,
                                },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.eventType,
                                    { color: theme.colors.text },
                                ]}
                            >
                                {item.type === "status_change"
                                    ? "Status change"
                                    : "Action"}
                            </Text>
                            <Text
                                style={[
                                    styles.eventMessage,
                                    { color: theme.colors.mutedText },
                                ]}
                            >
                                {item.message}
                            </Text>
                            <Text
                                style={[
                                    styles.eventMeta,
                                    { color: theme.colors.mutedText },
                                ]}
                            >
                                {new Date(item.createdAt).toLocaleString()}
                            </Text>
                        </View>
                    )}
                />
            )}
        </Screen>
    );
};

const styles = StyleSheet.create({
    center: {
        marginTop: 24,
    },
    header: {
        marginTop: 12,
        marginBottom: 16,
    },
    headerTitleRow: {
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
    title: {
        fontSize: 22,
        fontWeight: "700",
    },
    subtitle: {
        fontSize: 14,
        marginTop: 4,
    },
    statusText: {
        marginTop: 8,
        fontSize: 12,
        fontWeight: "600",
    },
    actionsRow: {
        flexDirection: "row",
        marginTop: 12,
        gap: 8,
    },
    actionButton: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 16,
        borderWidth: 1,
    },
    actionText: {
        fontSize: 13,
        fontWeight: "500",
    },
    actionInfo: {
        fontSize: 12,
        marginTop: 6,
    },
    actionError: {
        fontSize: 12,
        marginTop: 6,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 8,
    },
    noEventsText: {
        fontSize: 14,
    },
    eventsList: {
        paddingBottom: 16,
    },
    eventCard: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 12,
        marginBottom: 10,
    },
    eventType: {
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 4,
    },
    eventMessage: {
        fontSize: 13,
        marginBottom: 4,
    },
    eventMeta: {
        fontSize: 11,
    },
    errorText: {
        marginTop: 16,
        fontSize: 14,
    },
});

export default ServiceDetailsScreen;
