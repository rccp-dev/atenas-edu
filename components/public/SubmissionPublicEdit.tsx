'use client';

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";

import { Submission } from "@/types/submission";
import { Student } from "@/types/student";
import { Activity } from "@/types/activity";
import { Classroom } from "@/types/classroom";

import { getStudentById } from "@/services/student.service";
import { getActivityById } from "@/services/activity.service";
import { getClassrooms } from "@/services/classroom.service";
import { getClassroomById } from "@/services/classroom.service";

import Edit from "@/components/ui/Edit";
import UploadBox from "./UploadBox";
import { Button } from "../ui/Button";

interface Props {
    submission: Submission;
};

export default function SubmissionPublicEdit({ submission }: Props) {

    if(!submission.studentId || !submission.activityId || !submission.classroomId) {
        return notFound();
    }

    const [file, setFile] = useState<File | null>(null);
    const [student, setStudent] = useState<Student | null>(null);
    const [activity, setActivity] = useState<Activity | null>(null);
    const [classroom, setClassroom] = useState<Classroom | null>(null);
    const [classrooms, setClassrooms] = useState<Classroom[]>([]);

    

    useEffect(() => {

        async function loadData() {

            const [
                studentData,
                activityData,
                classroomsData,
                classroomData
            ] = await Promise.all([
                getStudentById(submission.studentId),
                getActivityById(submission.activityId),
                getClassrooms(),
                getClassroomById(submission.classroomId)
            ]);

            setStudent(studentData ?? null);
            setActivity(activityData ?? null);
            setClassrooms(classroomsData ?? null);
            setClassroom(classroomData ?? null);
        }

        loadData();

    }, [
        submission.studentId,
        submission.activityId,
        submission.classroomId
    ]);

    return (
        <Edit>

            <div className="mb-6">
                <h1 className="text-3xl font-bold text-foreground">
                    Editar envio: "{activity?.title}"
                </h1>

                <p className="mt-2 text-secondary">
                    {student?.name} - {classroom?.name}
                </p>
                
                {/* Desenvolver design token para status com badge em components/ e variação de cor por status */}
                <div className="flex gap-2 my-2 py-1 px-4 font-semibold text-light text-sm bg-amber-500 max-w-max rounded-2xl">
                    {submission.status}
                </div>
            </div>

            <div className="flex flex-col gap-4">

                <UploadBox file={file} setFile={setFile}/>

            </div>

            <div className="mt-8 flex gap-3">
                <Button>Enviar</Button>
            </div>

        </Edit>
    );
}