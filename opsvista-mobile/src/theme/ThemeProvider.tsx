import React, {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
} from "react";
import { Appearance } from "react-native";
import { AppTheme, lightTheme, darkTheme, ThemeMode } from "./theme";

type ThemeContextValue = {
    theme: AppTheme;
    mode: ThemeMode;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const systemColorScheme = Appearance.getColorScheme();
    const initialMode: ThemeMode = systemColorScheme === "dark" ? "dark" : "light";

    const [mode, setMode] = useState<ThemeMode>(initialMode);

    const toggleTheme = useCallback(() => {
        setMode((prev) => (prev === "light" ? "dark" : "light"));
    }, []);

    const theme: AppTheme = mode === "light" ? lightTheme : darkTheme;

    const value = useMemo(
        () => ({
            theme,
            mode,
            toggleTheme,
        }),
        [theme, mode, toggleTheme]
    );

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export function useAppTheme(): ThemeContextValue {
    const ctx = useContext(ThemeContext);
    if (!ctx) {
        throw new Error("useAppTheme must be used within ThemeProvider");
    }
    return ctx;
}
