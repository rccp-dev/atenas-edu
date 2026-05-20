import { Activity } from "@/types/activity";

export const activitiesMock: Activity[] = [
    {
        id: "1",
        title: "Redação",
        description: "Redação sobre o meio ambiente",
        deadline: "2026-01-01",
        token: "token1",
        classroomId: "1",
        attachments: ["https://example.com/attachment1", "https://example.com/attachment2"],
        status: ["Atribuída"],
        createdAt: "2026-01-01",
        isDraft: false
    },
    {
        id: "2",
        title: "Lista de exercícios",
        description: "Exercícios da página 28 sobre gramática",
        deadline: "2026-01-01",
        token: "token2",
        classroomId: "2",
        attachments: ["https://example.com/attachment3"],
        status: ["Atribuída"],
        createdAt: "2026-01-01",
        isDraft: false
    }
]