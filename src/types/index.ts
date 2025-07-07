export interface Note {
    id: bigint;
    title: string;
    content: string;
    userId: bigint;
    createdAt: string;
}

export interface AuthResponse {
    id: bigint;
    email: string;
    role: string;
    token: string;
}

export interface UserInfo {
    id: bigint;
    email: string;
    role: string
}
