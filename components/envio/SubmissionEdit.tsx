import { Submission } from "@/types/submission";
import { getStudentById } from "@/services/student.service";
import { getActivityById } from "@/services/activity.service";
import { getClassrooms } from "@/services/classroom.service";
import { getClassroomById } from "@/services/classroom.service";

import Edit from "@/components/ui/Edit";
import Field from "@/components/ui/Field";
import Select from "@/components/ui/Select";
import UploadBox from "./UploadBox";
import { Button } from "@/components/ui/Button";

interface Props {
    submission: Submission;
};

export default async function SubmissionEdit({ submission }: Props) {

    if(!submission.studentId || !submission.activityId || !submission.classroomId) {
        return null;
    }

    const student = await getStudentById(submission.studentId);
    const activity = await getActivityById(submission.activityId);
    const classrooms = await getClassrooms();
    const classroom = await getClassroomById(submission.classroomId);

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

                <Field label="Turma">
                    <Select defaultValue={submission.classroomId}>

                        <option value="">Selecione uma turma</option>

                        {classrooms.map((classroom) => (
                            <option key={classroom.id} value={classroom.id}>
                                {classroom.name}
                            </option>
                        ))}

                    </Select>
                </Field>

                <UploadBox />

            </div>

            <div className="mt-8 flex gap-3">
                <Button href="?mode=view">Voltar</Button>
                <Button>Salvar alterações</Button>
                <Button>Enviar correção</Button>
            </div>

        </Edit>
    );
}