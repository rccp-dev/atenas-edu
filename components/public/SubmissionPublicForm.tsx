'use client';

import { useState } from "react";
import { useEffect } from "react";
import { notFound } from "next/navigation";

import { Activity } from "@/types/activity";
import { Student } from "@/types/student";
import { Classroom } from "@/types/classroom";
import { getClassroomDisplayName } from "@/services/classroom.service";

import { createSubmission } from "@/services/submission.service";

import Form from "@/components/ui/Form";
import UploadBox from "@/components/public/UploadBox";
import { Button } from "../ui/Button";

interface Props {
    activity: Activity;
    student: Student;
    classroom: Classroom;
}

export default function SubmissionPublicForm({ activity, student, classroom }: Props) {

    if (!classroom) {
        return notFound();
    }

    const [file, setFile] = useState<File | null>(null);
    const [classroomName, setClassroomName] = useState<string>("");

    useEffect(() => {
        if (classroom) {
            setClassroomName(getClassroomDisplayName(classroom));
        } else {
            return notFound();
        }
    }, [classroom]);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        try {

            await createSubmission({
                studentId: student.id,
                classroomId: classroom.id,
                activityId: activity.id,
                /* Puxar URL de file da UploadBox */
                /* Criar lógica para decidir entre "Entregue" e "Entregue com atraso" para status */
                submittedAt: new Date().toISOString(),
                isDraft: false
            });

        } catch(error) {

            console.error(error);
            
        }

    }

    return (
        <Form onSubmit={handleSubmit}>
            <div className="flex flex-col w-sm">

                <h1 className="text-3xl font-bold text-foreground">
                    {student?.name || "Sem nome do aluno"}
                </h1>

                <p className="mt-2 text-secondary">
                    {classroomName}
                </p>
            </div>

            <UploadBox file={file} setFile={setFile}/>

            <div className="w-20">
                <Button type="submit">Enviar</Button>
            </div>
        </Form>
    );
}