export type Subject =
    | "Literatura"
    | "Gramática"
    | "Redação"

export interface LessonPlan {
    id: string;
    title?: string;
    subjects: Subject[];
    classroomId?: string;
    description?: string;
    content?: string;
    createdAt: string;
    updatedAt?: string;
    isDraft: boolean;
}