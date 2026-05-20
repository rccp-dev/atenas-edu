import { Activity } from "@/types/activity";
import { getClassrooms, getClassroomById} from "@/services/classroom.service";

import Edit from "@/components/ui/Edit";
import Field from "@/components/ui/Field";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import { Button } from "../ui/Button";

interface Props {
    activity: Activity;
}

export default async function ActivityEdit({ activity }: Props) {

    if (!activity.classroomId) {
        return null;
    }

    const classrooms = await getClassrooms();
    const classroom = await getClassroomById(activity.classroomId);

    return (
        <Edit>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-foreground">
                    Editar atividade
                </h1>

                <p className="mt-2 text-secondary">
                    {classroom?.name}
                </p>
            </div>

            <div className="flex flex-col gap-4">

                <Field label="Título">
                    <Input defaultValue={activity.title}/>
                </Field>

                <Field label="Turma">
                    <Select defaultValue={activity.classroomId}>

                        <option value="">Selecione uma turma</option>

                        {classrooms.map((classroom) => (
                            <option key={classroom.id} value={classroom.id}>
                                {classroom.name}
                            </option>
                        ))}

                    </Select>
                </Field>

                <Field label="Prazo">
                    <Input type="date" defaultValue={activity.deadline}/>
                </Field>

                <Field label="Anexos">
                    <Textarea defaultValue={activity.attachments?.join("\n")} placeholder="Um link por linha..."/>
                </Field>

                <Field label="Descrição">
                    <Textarea defaultValue={activity.description}/>
                </Field>

            </div>

            <div className="mt-8 flex gap-3">
                <Button href="?mode=view">Voltar</Button>
                <Button>Salvar alterações</Button>
            </div>
        </Edit>
    );
}