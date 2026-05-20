'use client';

import { useState } from "react";
import { notFound } from "next/navigation";

import { Activity } from "@/types/activity";
import { Student } from "@/types/student";
import { Classroom } from "@/types/classroom";

import { createSubmission } from "@/services/submission.service";

import Form from "@/components/ui/Form";
import UploadBox from "@/components/public/UploadBox";
import { Button } from "@/components/ui/Button";

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

    async function handleSubmit() {

        await createSubmission({
            studentId: student.id,
            classroomId: classroom.id,
            activityId: activity.id,
            file_url: file?.name || "",
            status: ["Entregue"],
            submittedAt: new Date().toISOString(),
            isDraft: false
        });

    }

    return (
        <Form>
            <div className="flex flex-col w-sm">

                <h1 className="text-3xl font-bold text-foreground">
                    {student?.name || "Sem nome do aluno"}
                </h1>

                <p className="mt-2 text-secondary">
                    {classroom?.name}
                </p>
            </div>

            <UploadBox file={file} setFile={setFile}/>

            <div className="w-20">
                <Button type="submit" onClick={handleSubmit}>Enviar</Button>
            </div>
        </Form>
    );
}