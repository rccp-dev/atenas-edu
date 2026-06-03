import { notFound } from "next/navigation";

import { Submission } from "@/types/submission";
import { getStudentById } from "@/services/student.service";
import { getActivityById } from "@/services/activity.service";
import { getClassroomById, getClassroomDisplayName } from "@/services/classroom.service";

import View from "@/components/ui/View";
import Status from "../ui/Status";
import { Button } from "../ui/Button";

import { formatDate } from "@/lib/format/formatDate";

import { serverClient } from "@/lib/supabase/server";



interface Props {
    submission: Submission;
};

export default async function SubmissionView({ submission }: Props) {

    if (!submission.studentId || !submission.activityId || !submission.classroomId) {
        notFound();
    }

    const supabase = await serverClient();

    const student = await getStudentById(supabase, submission.studentId);
    const activity = await getActivityById(supabase, submission.activityId);
    const classroom = await getClassroomById(supabase, submission.classroomId);

    if (!classroom) {
        notFound();
    }

    const classroomName = await getClassroomDisplayName(classroom);

    return (
        <View>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-foreground">
                    Envio: "{activity?.title}"
                </h1>

                <p className="mt-2 text-secondary">
                    {student?.name || "Sem nome do aluno"} - {classroomName}
                </p>
                
                <div className="flex gap-2 my-2 py-1 px-4">
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

            <div className="space-y-4 text-sm text-foreground">

                <div>
                    <span className="text-secondary">Nota:</span>
                    {" "}{submission.grade?.toString() || "Não avaliado"}
                </div>

                <div>
                    <span className="text-secondary">Feedback:</span>
                    <p className="mt-1 whitespace-pre-line">
                        {" "}{submission.feedback || "Sem feedback fornecido"}
                    </p>
                </div>

            </div>

            <div className="mt-8">
                <Button href="?mode=edit">Corrigir</Button>
            </div>
        </View>
    );
}