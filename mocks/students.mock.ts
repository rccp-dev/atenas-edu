import { Student } from "@/types/student";

// As propriedades de data só recebem YYYY-MM-DD, ssem horário.

export const studentsMock: Student[] = [
    {
        id: "1",
        name: "João Silva",
        enrollment: "2026001",
        classroomId: "1",
        createdAt: "15/01/2026",
        isDraft: false
    },
    {
        id: "2",
        name: "Maria Oliveira",
        enrollment: "2026002",
        classroomId: "1",
        createdAt: "15/01/2026",
        isDraft: false
    },
        {
        id: "3",
        name: "Marcos Silva",
        enrollment: "2026003",
        classroomId: "1",
        createdAt: "15/01/2026",
        isDraft: false
    },
    {
        id: "4",
        name: "Pedro Santos",
        enrollment: "2026004",
        classroomId: "2",
        createdAt: "15/01/2026",
        isDraft: false
    },
    {
        id: "5",
        name: "Ana Costa",
        enrollment: "2026005",
        classroomId: "2",
        createdAt: "15/01/2026",
        isDraft: false
    }
]