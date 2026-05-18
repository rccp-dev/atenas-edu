import { Submission } from "@/types/submission";
import { getActivityById } from "@/services/activity.service";
import { getClassroomById } from "@/services/classroom.service";

import Edit from "@/components/ui/Edit";
import Field from "@/components/ui/Field";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";

interface Props {
    submission: Submission;
};

export default async function Grading({ submission }: Props) {

    if(!submission.activityId || !submission.classroomId) {
        return null;
    }

    const activity = await getActivityById(submission.activityId);
    const classroom = await getClassroomById(submission.classroomId);

    return (
        <Edit>

            <div className="mb-6">
                <h1 className="text-3xl font-bold text-foreground">
                    Correção: "{" "}{activity?.title}"
                </h1>

                <p className="mt-2 text-secondary">
                    {submission.student_name} - {classroom?.name}
                </p>
                
                {/* Desenvolver design token para status com badge em components/ e variação de cor por status */}
                <div className="flex gap-2 my-2 py-1 px-4 font-semibold text-light text-sm bg-amber-500 max-w-max rounded-2xl">
                    {submission.status}
                </div>

                <div>
                    <span className="text-secondary text-sm">Enviado em:</span>
                    {" "}{submission.submittedAt}
                </div>

                <div>
                    <span className="text-secondary">Download do envio:</span>
                    {" "}
                    {submission.file_url
                        ? "https://atenas-edu.supabase.co/storage/v1/object/public/envios/" + submission.file_url
                         : "Sem arquivo enviado"}
                </div>
            </div>

            <div className="flex flex-col gap-4">

                <Field label="Nota">
                    <Input type="number" step="0.1" min="0" max="10" defaultValue={submission.grade?.toString() || ""} />
                </Field>

                <Field label="Feedback">
                    <Textarea
                        defaultValue={submission.feedback}
                    />
                </Field>

            </div>

            <div className="mt-8 flex gap-3">
                <Button href="?mode=view">Voltar</Button>
                <Button>Salvar alterações</Button>
                <Button>Enviar correção</Button>
            </div>

        </Edit>
    );
}