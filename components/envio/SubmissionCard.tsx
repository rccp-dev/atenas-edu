import { notFound } from "next/navigation";
import Link from "next/link";

import { Submission } from "@/types/submission";
import { getStudentById } from "@/services/student.service";
import { getActivityById } from "@/services/activity.service";
import { getClassroomById, getClassroomDisplayName } from "@/services/classroom.service";

import Card from "@/components/ui/Card";
import Status from "../ui/Status";

import { formatDate } from "@/lib/format/formatDate";

import { serverClient } from "@/lib/supabase/server";



interface Props {
    submission: Submission;
}

export default async function SubmissionCard({ submission }: Props) {

    if (!submission.studentId || !submission.activityId || !submission.classroomId) {
        return null;
    }
    
    const supabase = await serverClient();
    
    const student = await getStudentById(supabase, submission.studentId);
    const classroom = await getClassroomById(supabase, submission.classroomId);
    const activity = await getActivityById(supabase, submission.activityId);

    if (!classroom) {
        notFound();
    }

    const classroomName = await getClassroomDisplayName(classroom);

    return (
        <Link href={`/envios/${submission.id}`}>
            <Card>
                <div className="flex items-center justify-between">

                    <h2 className="text-xl font-semibold">
                        {student?.name || "Sem nome do aluno"} - {activity?.title || "Sem título da atividade"}
                    </h2>

                    <span className="text-sm text-secondary">
                        {formatDate(submission.submittedAt)}
                    </span>
                </div>

                <Status status={submission.status} />

                <p className="mt-3 text-secondary">
                    {classroomName}
                </p>

                <p className="mt-3 text-secondary">
                    {activity?.title}
                </p>
            </Card>
        </Link>
    );
}