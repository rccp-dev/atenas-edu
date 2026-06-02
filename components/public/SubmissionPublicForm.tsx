'use client';

import { useState, useEffect } from "react";
import { notFound } from "next/navigation";

import { Activity } from "@/types/activity";
import { Student } from "@/types/student";
import { Classroom } from "@/types/classroom";

import { getClassroomDisplayName } from "@/services/classroom.service";
import { createSubmission } from "@/services/submission.service";

import Form from "@/components/ui/Form";
import UploadBox from "@/components/public/UploadBox";
import { Button } from "../ui/Button";

import { success, error } from "@/lib/ui/toast";
import { browserClient } from "@/lib/supabase/browser";

interface Props {
    activity: Activity;
    student: Student;
    classroom: Classroom;
}

export default function SubmissionPublicForm({ activity, student, classroom }: Props) {

    if (!classroom) {
        notFound();
    }

    const supabase = browserClient();

    const [file, setFile] = useState<File | null>(null);
    const [classroomName, setClassroomName] = useState<string>("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (classroom) {
            setClassroomName(getClassroomDisplayName(classroom));
        } else {
            notFound();
        }
    }, [classroom]);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
            
        event.preventDefault();

        try {

            setLoading(true);

            await createSubmission(supabase, {
                studentId: student.id,
                classroomId: classroom.id,
                activityId: activity.id,
                submittedAt: new Date().toISOString(),
            });

            success("Atividade enviada com sucesso.");

        } catch(e) {

            console.error(e);
            error("Não foi possível enviar a atividade.");
                
        } finally {

            setLoading(false);

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
                <Button disabled={loading} type="submit">
                    {loading ? "Salvando..." : "Salvar"}
                </Button>
            </div>
        </Form>
    );
}