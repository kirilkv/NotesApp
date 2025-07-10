import axios from 'axios';
import type {AuthResponse, Note} from "../types";

const api = axios.create({
    baseURL: 'https://notesapi-morning-darkness-3178.fly.dev/api/'
});


// const api = axios.create({
//     baseURL: 'http://localhost:8080/api/'
// });

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);


export const authAPI = {
    login: (email: string, password: string) =>
        api.post<AuthResponse>('/auth/login', { email, password }),
    register: (email: string, password: string) =>
        api.post<AuthResponse>('/auth/register', { email, password }),
};

export const notesAPI = {
    getNotes: () => api.get<Note[]>('/notes'),
    getUserNotes: (userId: bigint) => api.get<Note[]>(`/notes?userId=${userId}`),
    createNote: (data: { title: string; content: string }) =>
        api.post<Note>('/notes', data),
    updateNote: (id: bigint, data: { title: string; content: string }) =>
        api.put<Note>(`/notes/${id}`, data),
    deleteNote: (id: bigint) => api.delete(`/notes/${id}`),
};

export const adminAPI = {
    createAdmin: (email: string, password: string) =>
        api.post('/auth/register/admin', { email, password }),
    getUsers: () => api.get('/users'),
};
