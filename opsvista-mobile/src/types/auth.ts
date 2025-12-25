// src/types/auth.ts
export type UserRole = "admin" | "operator" | "viewer";

export type AuthUser = {
    id: string;
    name: string;
    email: string;
    role: UserRole;
};

export type AuthState = {
    user: AuthUser | null;
    accessToken: string | null;
};
