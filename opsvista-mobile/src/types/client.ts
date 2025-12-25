// src/api/client.ts
import axios from "axios";
import {
    ApiEnvironment,
    ApiEvent,
    ApiListResponse,
    ApiService,
    ApiSingleResponse,
    ServiceAction,
} from "../types/api";
import { AuthUser, UserRole } from "./auth";

const BASE_URL = "http://localhost:4000/api";
let currentRole: UserRole = "viewer";

export function setCurrentUserRole(role: UserRole) {
    currentRole = role;
}

export const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10_000,
});

api.interceptors.request.use((config) => {
    config.headers = config.headers ?? {};
    if (!config.headers["x-user-role"]) {
        config.headers["x-user-role"] = currentRole;
    }
    return config;
});

export async function fetchEnvironments(): Promise<ApiEnvironment[]> {
    const res = await api.get<ApiListResponse<ApiEnvironment>>("/environments");
    return res.data.data;
}

export async function fetchServices(
    environmentId?: string
): Promise<ApiService[]> {
    const res = await api.get<ApiListResponse<ApiService>>("/services", {
        params: environmentId ? { environmentId } : undefined,
    });
    return res.data.data;
}

export async function fetchServiceById(id: string): Promise<ApiService> {
    const res = await api.get<ApiSingleResponse<ApiService>>(`/services/${id}`);
    return res.data.data;
}

export async function fetchServiceEvents(
    id: string
): Promise<ApiEvent[]> {
    const res = await api.get<ApiListResponse<ApiEvent>>(
        `/services/${id}/events`
    );
    return res.data.data;
}

export async function triggerServiceAction(
    id: string,
    action: ServiceAction
): Promise<{
    event: ApiEvent;
    updatedService: ApiService;
}> {
    const res = await api.post<{
        ok: boolean;
        message: string;
        event: ApiEvent;
        updatedService: ApiService;
    }>(`/services/${id}/actions`, { action });

    return {
        event: res.data.event,
        updatedService: res.data.updatedService,
    };
}

export async function loginRequest(params: {
    email: string;
    password: string;
}): Promise<{
    user: AuthUser;
    accessToken: string;
}> {
    const res = await api.post<{
        ok: boolean;
        user: AuthUser;
        accessToken: string;
    }>("/auth/login", params);

    const { user, accessToken } = res.data;

    setCurrentUserRole(user.role);

    return { user, accessToken };
}
