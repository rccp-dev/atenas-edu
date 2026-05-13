import { LessonPlan } from "@/types/lessonPlan";

export const lessonPlansMock: LessonPlan[] = [
    {
        id: "1",
        title: "Substantivos",
        subjects: ["Gramática"],
        classroomId: "a82k7",
        description: "Introdução à substantivos",
        content: "",
        createdAt: "10/01/26",
        isDraft: false
    },
    {
        id: "2",
        title: "Adjetivos",
        subjects: ["Gramática"],
        classroomId: "a56y8",
        description: "Introdução à adjetivos",
        content: "",
        createdAt: "05/02/26",
        isDraft: false
    },
    {
        id: "3",
        title: "Crônica",
        subjects: ["Redação"],
        classroomId: "as45t",
        description: "Introdução à crônica",
        content: "",
        createdAt: "11/02/26",
        isDraft: false
    },
    {
        id: "4",
        title: "Machado de Assis",
        subjects: ["Redação"],
        classroomId: "t12v0",
        description: "Introdução às obras de Machado de Assis",
        content: "",
        createdAt: "15/02/26",
        isDraft: false
    }
];