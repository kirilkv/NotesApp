export interface Note {
    id: bigint;
    title: string;
    content: string;
    userId: bigint;
    createdAt: string;
    updatedAt: string;
}

export interface AuthResponse {
    id: bigint;
    email: string;
    role: string;
    token: string;
    type: string;
}

export interface UserInfo {
    id: bigint;
    email: string;
    role: string;
}
