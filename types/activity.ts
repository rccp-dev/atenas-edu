export const status_options = [
    "Atribuída",
    "Encerrada",
    "Entregue",
] as const;

export type Status =
    (typeof status_options)[number];

export interface Activity {
    id: string;
    title: string;
    description: string;
    deadline?: string;
    public_token: string;
    classroomId: string;
    attachments?: string[];
    status: Status[];
    createdAt: string;
    updatedAt?: string;
    isDraft: boolean;
}