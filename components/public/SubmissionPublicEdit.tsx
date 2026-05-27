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
import UploadBox from "./UploadBox";
import { Button } from "../ui/Button";

interface Props {
    submission: Submission;
}

export default function SubmissionPublicEdit({ submission }: Props) {

    if (!submission.studentId || !submission.activityId || !submission.classroomId) {
        return notFound();
    }

    const [fileUrl, setFileUrl] = useState<string | null>(null);
    const [student, setStudent] = useState<Student | null>(null);
    const [activity, setActivity] = useState<Activity | null>(null);
    const [classroomName, setClassroomName] = useState("");

    const [saving, setSaving] = useState(false);

    useEffect(() => {

        async function loadData() {

            const [studentData, activityData, classroom] = await Promise.all([
                getStudentById(submission.studentId),
                getActivityById(submission.activityId),
                getClassroomById(submission.classroomId),
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

    async function handleSubmit() {

        try {

            setSaving(true);

            await updateSubmission(submission.id, {
                file_url: fileUrl ?? undefined,
            });

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

                <div className="flex gap-2 my-2 py-1 px-4 font-semibold text-light text-sm bg-amber-500 max-w-max rounded-2xl">
                    {submission.status}
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <UploadBox file={fileUrl} setFile={setFileUrl} />
            </div>

            <div className="mt-8 flex gap-3">
                <Button disabled={saving} onClick={handleSubmit}>
                    {saving ? "Enviando..." : "Enviar"}
                </Button>
            </div>

        </Edit>
    );
}