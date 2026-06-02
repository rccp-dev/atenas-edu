"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";

import { Submission } from "@/types/submission";
import { Student } from "@/types/student";
import { Activity } from "@/types/activity";

import { getStudentById } from "@/services/student.service";
import { getActivityById } from "@/services/activity.service";

import { getClassroomById, getClassroomDisplayName } from "@/services/classroom.service";

import { updateSubmission } from "@/services/submission.service";

import Edit from "@/components/ui/Edit";
import Form from "@/components/ui/Form";

import Field from "@/components/ui/Field";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Status from "@/components/ui/Status";
import { Button } from "../ui/Button";

import { formatDate } from "@/lib/format/formatDate";
import { success, error } from "@/lib/ui/toast";

import { browserClient } from "@/lib/supabase/browser";

interface Props {
    submission: Submission;
}

export default function Grading({ submission }: Props) {

    const supabase = browserClient();

    const [saving, setSaving] = useState(false);

    const [student, setStudent] = useState<Student | null>(null);
    const [activity, setActivity] = useState<Activity | null>(null);

    const [classroomName, setClassroomName] = useState("");

    const [grade, setGrade] = useState(submission.grade?.toString() || "");
    const [feedback, setFeedback] = useState(submission.feedback || "");

    useEffect(() => {

        async function loadData() {

            if (!submission.studentId || !submission.activityId || !submission.classroomId) {
                notFound();
            }

            const [
                studentData,
                activityData,
                classroomData
            ] = await Promise.all([
                getStudentById(supabase, submission.studentId),
                getActivityById(supabase, submission.activityId),
                getClassroomById(supabase, submission.classroomId),
            ]);

            setStudent(studentData);
            setActivity(activityData);

            if (!classroomData) {
                notFound();
            }

            setClassroomName(
                getClassroomDisplayName(classroomData)
            );

        }

        loadData();

    }, [
        submission.studentId,
        submission.activityId,
        submission.classroomId
    ]);

    async function handleUpdate(event: React.FormEvent<HTMLFormElement>) {

        event.preventDefault();

        try {

            setSaving(true);

            await updateSubmission(supabase, submission.id, {
                grade: grade ? Number(grade) : 0,
                feedback,
                status: "Corrigida",
            });

            success("Alterações salvas com sucesso.");

        } catch(e) {

            console.error(e);
            error("Não foi possível salvar as alterações.");

        } finally {

            setSaving(false);

        }

    }

    async function handleSubmitCorrection() {

        try {

            setSaving(true);

            await updateSubmission(supabase, submission.id, {
                status: "Corrigida",
                grade: grade ? Number(grade) : 0,
                feedback
            });

            success("Correção enviada com sucesso.");

        } catch(e) {

            console.error(e);
            error("Não foi possível enviar a correção.");

        } finally {

            setSaving(false);

        }

    }

    return (
        <Edit>

            <div className="mb-6">
                <h1 className="text-3xl font-bold text-foreground">
                    Correção: "{activity?.title}"
                </h1>

                <p className="mt-2 text-secondary">
                    {student?.name} - {classroomName}
                </p>

                <div className="flex gap-2 my-2 py-1 px-4 font-semibold text-light text-sm bg-amber-500 max-w-max rounded-2xl">
                    <Status status={submission.status} />
                </div>

                <div>
                    <span className="text-secondary">Enviado em:</span>
                    {" "}{formatDate(submission.submittedAt)}
                </div>

                <div>
                    <span className="text-secondary">Download do envio:</span>
                    {" "}
                    {submission.file_url
                        ? `https://atenas-edu.supabase.co/storage/v1/object/public/envios/${submission.file_url}`
                        : "Sem arquivo enviado"}
                </div>
            </div>

            <Form onSubmit={handleUpdate}>
                <div className="flex flex-col gap-4">

                    <Field label="Nota">
                        <Input type="number" step="0.1" min="0" max="10" value={grade} onChange={(e) => setGrade(e.target.value)} />
                    </Field>

                    <Field label="Feedback">
                        <Textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} />
                    </Field>

                </div>

                <div className="mt-8 flex gap-3">
                    <Button href="?mode=view">Voltar</Button>

                    <Button type="submit" disabled={saving}>
                        {saving ? "Salvando..." : "Salvar alterações"}
                    </Button>

                    <Button type="button" disabled={saving} onClick={handleSubmitCorrection}>
                        Enviar correção
                    </Button>
                </div>
            </Form>

        </Edit>
    );
}