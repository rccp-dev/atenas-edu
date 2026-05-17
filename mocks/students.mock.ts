import { Student } from "@/types/student";

// As propriedades de data só recebem YYYY-MM-DD, ssem horário.

export const studentsMock: Student[] = [
    {
        id: "1",
        nome: "João Silva",
        matricula: "2026001",
        classroomId: "1",
        createdAt: "2026-01-15",
        isDraft: false
    },
    {
        id: "2",
        nome: "Maria Oliveira",
        matricula: "2026002",
        classroomId: "1",
        createdAt: "2026-01-15",
        isDraft: false
    },
    {
        id: "3",
        nome: "Pedro Santos",
        matricula: "2026003",
        classroomId: "2",
        createdAt: "2026-01-15",
        isDraft: false
    },
    {
        id: "4",
        nome: "Ana Costa",
        matricula: "2026004",
        classroomId: "2",
        createdAt: "2026-01-15",
        isDraft: false
    }
]