import { Submission } from "@/types/submission";

export const submissionsMock: Submission[] = [
    {
        id: "1",
        activityId: "1",
        studentId: "1",
        classroomId: "1",
        file_url: "envio1.pdf",
        grade: 8.5,
        feedback: "Bom trabalho!",
        status: ["Entregue"],
        createdAt: "20/03/2026",
        submittedAt: "27/03/2026",
        isDraft: false,
    },
    {
        id: "2",
        activityId: "1",
        studentId: "2",
        classroomId: "1",
        file_url: "envio2.pdf",
        grade: 9.0,
        feedback: "Excelente trabalho!",
        status: ["Entregue"],
        createdAt: "20/03/2026",
        submittedAt: "27/03/2026",
        isDraft: true,
    }
]