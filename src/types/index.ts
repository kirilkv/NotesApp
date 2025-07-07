export interface User {
    id: bigint;
    email: string;
    role: 'user' | 'admin';
}

export interface Note {
    id: bigint;
    title: string;
    content: string;
    userId: bigint;
    createdAt: string;
}

export interface AuthResponse {
    sub: string;
    role: string;
    token: string;
}

export interface UserInfo {
    email: string;
    role: string
}
