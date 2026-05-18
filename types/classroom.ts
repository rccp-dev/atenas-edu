export interface Classroom {
    id: string;
    name: string;
    year: number;
    identifier: string;
    description?: string;
    createdAt: string;
    updatedAt?: string;
    isDraft: boolean;
}