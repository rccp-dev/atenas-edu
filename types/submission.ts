export const status_options = [
    "Pendente",
    "Entregue",
    "Corrigida",
] as const;

export type Status =
    (typeof status_options)[number];

export interface Submission {
    id: string;
    activityId: string;
    studentId: string;
    classroomId: string;
    file_url: string;
    grade?: number;
    feedback?: string;
    status: Status[];
    createdAt: string;
    submittedAt: string;
    isDraft: boolean;
}