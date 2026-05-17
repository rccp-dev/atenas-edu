import { Classroom } from "@/types/classroom";

// São apenas turmas de matéria de português. Deve ter apenas dados referentes a isso.
// As propriedades de data só recebem YYYY-MM-DD, sem horário.

export const classroomsMock: Classroom[] = [
    {
        id: "1",
        nome: "1º ano A",
        ano: 1,
        identificador: "A",
        descricao: "Turma do 1º ano A de português",
        createdAt: "2026-01-01",
        isDraft: false
    },
    {
        id: "2",
        nome: "2º ano B",
        ano: 2,
        identificador: "B",
        descricao: "Turma do 2º ano B de português",
        createdAt: "2026-01-01",
        isDraft: false
    }
]
