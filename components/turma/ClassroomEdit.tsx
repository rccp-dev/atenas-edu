import { Classroom } from "@/types/classroom";
import { getClassroomDisplayName } from "@/services/classroom.service";

import Edit from "@/components/ui/Edit";
import Field from "@/components/ui/Field";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import { Button } from "../ui/Button";

interface Props {
    classroom: Classroom;
};

export default function ClassroomEdit({ classroom }: Props) {

    const classroomName = getClassroomDisplayName(classroom);

    return (
        <Edit>
            <div className="mb-6">
                <h1 className="text-3xl font-bold">
                    Editar turma
                </h1>

                <p className="mt-2 text-secondary">
                    {classroomName}
                </p>
            </div>

            <div className="flex flex-col gap-4">

                <Field label="Ano">
                    <Input defaultValue={classroom.year}/>
                </Field>

                <Field label="Série">
                    <Input defaultValue={classroom.grade}/>
                </Field>

                <Field label="Descrição">
                    <Textarea defaultValue={classroom.description}/>
                </Field>

            </div>

            <div className="mt-8 flex gap-3">
                <Button href="?mode=view">Voltar</Button>
                <Button>Salvar alterações</Button>
            </div>
        </Edit>
    );
}