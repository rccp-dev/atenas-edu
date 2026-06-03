'use client';

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";

import { Submission } from "@/types/submission";
import { Student } from "@/types/student";
import { Activity } from "@/types/activity";

import { getStudentById } from "@/services/student.service";

import { getActivityById } from "@/services/activity.service";

import { getClassroomById, getClassroomDisplayName } from "@/services/classroom.service";

import { updateSubmission } from "@/services/submission.service";

import { uploadFile } from "@/lib/upload/upload";

import Edit from "@/components/ui/Edit";
import Form from "@/components/ui/Form";
import UploadBox from "./UploadBox";
import Status from "../ui/Status";
import Confirm from "../ui/Confirm";
import { Button } from "../ui/Button";


import { success, error } from "@/lib/ui/toast";

import { browserClient } from "@/lib/supabase/browser";

interface Props {
    submission: Submission;
}

export default function SubmissionPublicEdit({ submission }: Props) {

    if (!submission.studentId || !submission.activityId || !submission.classroomId) {
        notFound();
    }

    const supabase = browserClient();

    const [file, setFile] = useState<File | null>(null);
    const [student, setStudent] = useState<Student | null>(null);
    const [activity, setActivity] = useState<Activity | null>(null);
    const [classroomName, setClassroomName] = useState("");

    const [saving, setSaving] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {

        async function loadData() {

            const [studentData, activityData, classroom] = await Promise.all([
                getStudentById(supabase, submission.studentId),
                getActivityById(supabase, submission.activityId),
                getClassroomById(supabase, submission.classroomId),
            ]);

            setStudent(studentData ?? null);
            setActivity(activityData ?? null);

            if (classroom) {
                setClassroomName(getClassroomDisplayName(classroom));
            }
        }

        loadData();

    }, [
        submission.studentId,
        submission.activityId,
        submission.classroomId
    ]);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {

        event.preventDefault();

        try {

            setSaving(true);

            let fileUrl: string | undefined;

            if (file) {
                fileUrl = await uploadFile(file);
            }

            await updateSubmission(supabase, submission.id, {
                file_url: fileUrl,
            });

            success("Arquivo enviado com sucesso.");

        } catch(e) {

            console.error(e);
            error("Não foi possível enviar o arquivo.");

        } finally {

            setSaving(false);

        }

    }

    return (
        <Edit>

            <div className="mb-6">
                <h1 className="text-3xl font-bold text-foreground">
                    Editar envio: "{activity?.title}"
                </h1>

                <p className="mt-2 text-secondary">
                    {student?.name} - {classroomName}
                </p>

                <div className="flex gap-2 my-2 py-1 px-4">
                    <Status status={submission.status} />
                </div>
            </div>

            <Form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4">
                    <UploadBox file={file} setFile={setFile} />
                </div>

                <div className="mt-8 flex gap-3">
                    <Button onClick={() => setOpen(true)}>
                        Voltar
                    </Button>

                    <Confirm
                        open={open}
                        title="Deseja voltar?"
                        description="As alterações realizadas serão perdidas se não estiverem salvas."
                        variant="warning"
                        onCancel={() => setOpen(false)}
                        onConfirm={() => {
                            setOpen(false);
                            window.location.href = "?mode=view"}
                        }
                    />

                    <Button type="submit" disabled={saving}>
                        {saving ? "Enviando..." : "Enviar"}
                    </Button>
                </div>
            </Form>

        </Edit>
    );
}