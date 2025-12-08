export type ThemeMode = "light" | "dark";

export type AppTheme = {
    mode: ThemeMode;
    colors: {
        background: string;
        card: string;
        text: string;
        mutedText: string;
        primary: string;
        border: string;
        danger: string;
    };
};

export const lightTheme: AppTheme = {
    mode: "light",
    colors: {
        background: "#F5F5F7",
        card: "#FFFFFF",
        text: "#111827",
        mutedText: "#6B7280",
        primary: "#2563EB",
        border: "#E5E7EB",
        danger: "#DC2626",
    },
};

export const darkTheme: AppTheme = {
    mode: "dark",
    colors: {
        background: "#020617",
        card: "#0F172A",
        text: "#F9FAFB",
        mutedText: "#9CA3AF",
        primary: "#3B82F6",
        border: "#1F2937",
        danger: "#F97373",
    },
};
