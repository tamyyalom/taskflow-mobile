// src/auth/AuthContext.tsx
import React, { createContext, useContext, useState } from "react";
import { AuthUser, UserRole, AuthState } from "../../types/auth";
import { loginRequest, setCurrentUserRole } from "../../types/client";

type AuthContextValue = {
    user: AuthUser | null;
    role: UserRole | null;
    accessToken: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [state, setState] = useState<AuthState>({
        user: null,
        accessToken: null,
    });

    const login = async (email: string, password: string) => {
        const { user, accessToken } = await loginRequest({ email, password });

        setState({ user, accessToken });
        setCurrentUserRole(user.role);
    };

    const logout = () => {
        setState({ user: null, accessToken: null });
        setCurrentUserRole("viewer");
    };

    const value: AuthContextValue = {
        user: state.user,
        role: state.user?.role ?? null,
        accessToken: state.accessToken,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return ctx;
}
