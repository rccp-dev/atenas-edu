export interface Classroom {
    id: string;
    year: number;
    grade: string;
    description?: string;
    createdAt: string;
    updatedAt?: string;
    isDraft: boolean;
}