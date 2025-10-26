export interface User {
    username: string;
    role: 'admin' | 'user';
}

export interface Comment {
    id: string;
    jobId: string;
    username: string;
    text: string;
    createdAt: Date;
}