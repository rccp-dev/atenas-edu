import { Activity } from "@/types/activity";

export const activitiesMock: Activity[] = [
    {
        id: "1",
        title: "Atividade 1",
        description: "Descrição da atividade 1",
        deadline: "2026-01-01",
        public_token: "token1",
        classroomId: "1",
        attachments: ["https://example.com/attachment1", "https://example.com/attachment2"],
        status: ["Atribuída"],
        createdAt: "2026-01-01",
        isDraft: false
    },
    {
        id: "2",
        title: "Atividade 2",
        description: "Descrição da atividade 2",
        deadline: "2026-01-01",
        public_token: "token2",
        classroomId: "2",
        attachments: ["https://example.com/attachment3"],
        status: ["Atribuída"],
        createdAt: "2026-01-01",
        isDraft: false
    }
]