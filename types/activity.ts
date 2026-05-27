export const status_options = [
    "Atribuída",
    "Corrigida",
] as const;

export type Status =
    (typeof status_options)[number];

export interface Activity {
    id: string;
    title: string;
    description: string;
    deadline?: string;
    token: string;
    classroomId: string;
    attachments?: string[];
    status: Status;
    createdAt: string;
    updatedAt?: string;
    isDraft: boolean;
}