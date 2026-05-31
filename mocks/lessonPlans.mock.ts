import { LessonPlan } from "@/types/lessonPlan";

export const lessonPlansMock: LessonPlan[] = [
    {
        id: "1",
        title: "Substantivos",
        subjects: ["Gramática"],
        classroomId: "1",
        description: "Introdução à substantivos",
        content: "",
        createdAt: "10/01/26"
    },
    {
        id: "2",
        title: "Adjetivos",
        subjects: ["Gramática"],
        classroomId: "1",
        description: "Introdução à adjetivos",
        content: "",
        createdAt: "05/02/26"
    },
    {
        id: "3",
        title: "Crônica",
        subjects: ["Redação"],
        classroomId: "2",
        description: "Introdução à crônica",
        content: "",
        createdAt: "11/02/26"
    },
    {
        id: "4",
        title: "Machado de Assis",
        subjects: ["Redação"],
        classroomId: "2",
        description: "Introdução às obras de Machado de Assis",
        content: "",
        createdAt: "15/02/26"
    }
];