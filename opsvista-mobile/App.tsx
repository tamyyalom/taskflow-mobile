import React from "react";
import { Text, TouchableOpacity } from 'react-native';
import { ThemeProvider, useAppTheme } from "./src/theme/ThemeProvider";
import RootNavigator from './src/navigation/rootNavigator';
import { AuthProvider } from "./src/screens/auth/AuthContext";

const ThemeToggle: React.FC = () => {
  const { mode, toggleTheme, theme } = useAppTheme();

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      style={{
        position: "absolute",
        top: 16,
        right: 16,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
        backgroundColor: theme.colors.card,
        borderWidth: 1,
        borderColor: theme.colors.border,
        zIndex: 100,
      }}
    >
      <Text style={{ color: theme.colors.text, fontSize: 12 }}>
        {mode === "light" ? "Dark" : "Light"}
      </Text>
    </TouchableOpacity>
  );
};

const AppInner: React.FC = () => {
  return (
    <>
      <RootNavigator />
      <ThemeToggle />
    </>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppInner />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;

