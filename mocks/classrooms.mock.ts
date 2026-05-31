import { Classroom } from "@/types/classroom";

// São apenas turmas de matéria de português. Deve ter apenas dados referentes a isso.
// As propriedades de data só recebem YYYY-MM-DD, sem horário.

export const classroomsMock: Classroom[] = [
    {
        id: "1",
        grade: 1,
        section: "A",
        description: "Turma do 1º ano A de português",
        createdAt: "2026-01-01"
    },
    {
        id: "2",
        grade: 2,
        section: "B",
        description: "Turma do 2º ano B de português",
        createdAt: "2026-01-01"
    }
]
