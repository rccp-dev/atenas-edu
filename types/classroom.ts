export interface Classroom {
    id: string;
    grade: number;
    section: string;
    description?: string;
    createdAt: string;
    updatedAt?: string;
    isDraft: boolean;
}