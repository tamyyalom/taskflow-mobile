// src/screens/app/ProjectsScreen.tsx
import React from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import Screen from "../../components/Screen";
import { useAppTheme } from "../../theme/ThemeProvider";

type Project = {
    id: string;
    name: string;
};

type Props = {
    onOpenProject?: (projectId: string) => void;
};

const mockProjects: Project[] = [
    { id: "1", name: "Onboarding revamp" },
    { id: "2", name: "TaskFlow mobile MVP" },
    { id: "3", name: "Internal tools" },
];

const ProjectsScreen: React.FC<Props> = ({ onOpenProject }) => {
    const { theme } = useAppTheme();

    return (
        <Screen>
            <Text style={[styles.title, { color: theme.colors.text }]}>Projects</Text>
            <FlatList
                data={mockProjects}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[
                            styles.card,
                            {
                                backgroundColor: theme.colors.card,
                                borderColor: theme.colors.border,
                            },
                        ]}
                        onPress={() => onOpenProject?.(item.id)}
                    >
                        <Text style={[styles.cardTitle, { color: theme.colors.text }]}>
                            {item.name}
                        </Text>
                        <Text
                            style={[styles.cardSubtitle, { color: theme.colors.mutedText }]}
                        >
                            Tap to view tasks
                        </Text>
                    </TouchableOpacity>
                )}
            />
        </Screen>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: "700",
        marginBottom: 16,
        marginTop: 12,
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
});

export default ProjectsScreen;
