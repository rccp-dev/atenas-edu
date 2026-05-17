export const subject_options = [
    "Literatura",
    "Gramática",
    "Redação",
] as const;

export type Subject =
    (typeof subject_options)[number];

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