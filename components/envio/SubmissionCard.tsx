import { Submission } from "@/types/submission";
import { getActivityById } from "@/services/activity.service";
import { getClassroomById } from "@/services/classroom.service";
import Link from "next/link";
import Card from "@/components/ui/Card";

interface Props {
    submission: Submission;
}

export default async function SubmissionCard({ submission }: Props) {

    if (!submission.activityId) {
        return null;
    }

    if (!submission.classroomId) {
        return null;
    }

    const classroom = await getClassroomById(submission.classroomId);
    const activity = await getActivityById(submission.activityId);

    return (
        <Link href={`/entidade/${submission.id}`}>
            <Card>
                <div className="flex items-center justify-between">

                    <h2 className="text-xl font-semibold">
                        {submission.student_name || "Sem título"}
                    </h2>

                    <span className="text-sm text-secondary">
                        {submission.submittedAt}
                    </span>
                </div>

                {/* Criar get para status da entrega */}

                <p className="mt-3 text-secondary">
                    {classroom?.name}
                </p>

                <p className="mt-3 text-secondary">
                    {activity?.title}
                </p>
            </Card>
        </Link>
    );
}