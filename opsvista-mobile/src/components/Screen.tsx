import React from "react";
import {
    SafeAreaView,
    StyleSheet,
    View,
    StatusBar,
    ViewProps,
} from "react-native";
import { useAppTheme } from "../theme/ThemeProvider";

type ScreenProps = ViewProps & {
    children: React.ReactNode;
};

const Screen: React.FC<ScreenProps> = ({ children, style, ...rest }) => {
    const { theme, mode } = useAppTheme();

    return (
        <View style={[styles.root, { backgroundColor: theme.colors.background }]}>
            <StatusBar
                barStyle={mode === "dark" ? "light-content" : "dark-content"}
                backgroundColor={theme.colors.background}
            />
            <SafeAreaView
                style={[styles.safeArea, { backgroundColor: theme.colors.background }]}
            >
                <View
                    style={[styles.content, { backgroundColor: theme.colors.background }, style]}
                    {...rest}
                >
                    {children}
                </View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    root: { flex: 1 },
    safeArea: { flex: 1 },
    content: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
});

export default Screen;
