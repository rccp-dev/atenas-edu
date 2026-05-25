import { Submission } from "@/types/submission";
import { getStudentById } from "@/services/student.service";
import { getActivityById } from "@/services/activity.service";
import { getClassroomById, getClassroomDisplayName } from "@/services/classroom.service";
import Link from "next/link";
import Card from "@/components/ui/Card";
import { notFound } from "next/navigation";

interface Props {
    submission: Submission;
}

export default async function SubmissionCard({ submission }: Props) {

    if (!submission.studentId || !submission.activityId || !submission.classroomId) {
        return notFound();
    }
    
    const student = await getStudentById(submission.studentId);
    const classroom = await getClassroomById(submission.classroomId);
    const activity = await getActivityById(submission.activityId);

    if (!classroom) {
        return notFound();
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
                        {submission.submittedAt}
                    </span>
                </div>

                {/* Criar get para status da entrega */}

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