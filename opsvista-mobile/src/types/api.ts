// src/types/api.ts

export type ID = string;

export type ApiEnvironment = {
    id: ID;
    name: string;
    isActive: boolean;
};

export type ServiceStatus = "healthy" | "degraded" | "down";

export type ServiceAction =
    | "restart"
    | "pause"
    | "resume"
    | "toggle_feature";

export type ApiService = {
    id: ID;
    name: string;
    description?: string | null;
    environmentId: ID;
    status: ServiceStatus;
    lastCheckedAt?: string | null;
};

export type EventType = "status_change" | "action";

export type ApiEvent = {
    id: ID;
    serviceId: ID;
    type: EventType;
    message: string;
    fromStatus?: ServiceStatus | null;
    toStatus?: ServiceStatus | null;
    triggeredByUserId?: ID | null;
    createdAt: string;
};

export type ApiListResponse<T> = {
    ok: boolean;
    data: T[];
};

export type ApiSingleResponse<T> = {
    ok: boolean;
    data: T;
};

export type ApiErrorResponse = {
    ok: false;
    error: string;
};
