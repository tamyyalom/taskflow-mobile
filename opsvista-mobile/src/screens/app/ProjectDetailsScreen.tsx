// src/screens/app/ProjectDetailsScreen.tsx
import React from "react";
import { StyleSheet, Text } from "react-native";
import Screen from "../../components/Screen";
import { useAppTheme } from "../../theme/ThemeProvider";

type Props = {
    projectId?: string;
};

const ProjectDetailsScreen: React.FC<Props> = ({ projectId }) => {
    const { theme } = useAppTheme();

    return (
        <Screen>
            <Text style={[styles.title, { color: theme.colors.text }]}>
                Project details
            </Text>
            <Text style={[styles.text, { color: theme.colors.mutedText }]}>
                Project ID: {projectId ?? "N/A"}
            </Text>
        </Screen>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 22,
        fontWeight: "700",
        marginTop: 12,
        marginBottom: 8,
    },
    text: {
        fontSize: 14,
    },
});

export default ProjectDetailsScreen;
