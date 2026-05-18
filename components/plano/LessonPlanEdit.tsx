import { LessonPlan } from "@/types/lessonPlan";
import { subject_options } from "@/types/lessonPlan";
import { getClassrooms, getClassroomById } from "@/services/classroom.service";

import Edit from "@/components/ui/Edit";
import Field from "@/components/ui/Field";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";

interface Props {
    plan: LessonPlan;
};

export default async function LessonPlanEdit({ plan }: Props) {

    if (!plan.classroomId) {
        return null;
    }

    const classrooms = await getClassrooms();
    const classroom = await getClassroomById(plan.classroomId);

    return (
        <Edit>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-foreground">
                    Editar plano de aula
                </h1>

                <p className="mt-2 text-secondary">
                    {classroom?.name}
                </p>
            </div>

            <div className="flex flex-col gap-4">
                
                <Field label="Título">
                    <Input defaultValue={plan.title}/>
                </Field>

                <Field label="Matérias">
                    <Select multiple defaultValue={plan.subjects}>

                        <option value="">Selecione uma ou mais matérias</option>

                        {subject_options.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}

                    </Select>
                </Field>

                <Field label="Turma">
                    <Select defaultValue={plan.classroomId}>

                        <option value="">Selecione uma turma</option>

                        {classrooms.map((classroom) => (
                            <option key={classroom.id} value={classroom.id}>
                                {classroom.name}
                            </option>
                        ))}

                    </Select>
                </Field>

                <Field label="Descrição">
                    <Textarea defaultValue={plan.description}/>
                </Field>

                <Field label="Conteúdo">
                    <Textarea defaultValue={plan.content} className="min-h-50"/>
                </Field>

            </div>

            <div className="mt-8 flex gap-3">
                <Button href="?mode=view">Voltar</Button>
                <Button>Salvar alterações</Button>
            </div>
        </Edit>
    );
}