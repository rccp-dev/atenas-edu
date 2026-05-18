import { Student } from "@/types/student";

// As propriedades de data só recebem YYYY-MM-DD, ssem horário.

export const studentsMock: Student[] = [
    {
        id: "1",
        name: "João Silva",
        enrollment: "2026001",
        classroomId: "1",
        createdAt: "2026-01-15",
        isDraft: false
    },
    {
        id: "2",
        name: "Maria Oliveira",
        enrollment: "2026002",
        classroomId: "1",
        createdAt: "2026-01-15",
        isDraft: false
    },
    {
        id: "3",
        name: "Pedro Santos",
        enrollment: "2026003",
        classroomId: "2",
        createdAt: "2026-01-15",
        isDraft: false
    },
    {
        id: "4",
        name: "Ana Costa",
        enrollment: "2026004",
        classroomId: "2",
        createdAt: "2026-01-15",
        isDraft: false
    }
]