import { Submission } from "@/types/submission";
import { getStudentById } from "@/services/student.service";
import { getActivityById } from "@/services/activity.service";
import { getClassroomById, getClassroomDisplayName } from "@/services/classroom.service";

import View from "@/components/ui/View";
import { notFound } from "next/navigation";

import { serverClient } from "@/lib/supabase/server";

interface Props {
    submission: Submission;
};

export default async function SubmissionPublicView({ submission }: Props) {

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
                
                {/* Desenvolver design token para status com badge em components/ e variação de cor por status */}
                <div className="flex gap-2 my-2 py-1 px-4 font-semibold text-light text-sm bg-amber-500 max-w-max rounded-2xl">
                    {submission.status}
                </div>

                <div>
                    <span className="text-secondary">Enviado em:</span>
                    {" "}{submission.submittedAt}
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
        </View>
    );
}