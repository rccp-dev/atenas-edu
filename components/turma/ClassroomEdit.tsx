import { Classroom } from "@/types/classroom";
import { Student } from "@/types/student";

import Edit from "@/components/ui/Edit";
import Field from "@/components/ui/Field";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";

interface Props {
    classroom: Classroom;
    students: Student;
};

export default function ClassroomEdit({ classroom }: Props) {

    return (
        <Edit>
            <div className="mb-6">
                <h1 className="text-3xl font-bold">
                    Editar turma
                </h1>

                <p className="mt-2 text-secondary">
                    {classroom.name}
                </p>
            </div>

            <div className="flex flex-col gap-4">

                <Field label="Ano">
                    <Input defaultValue={classroom.year}/>
                </Field>

                <Field label="Série">
                    <Input defaultValue={classroom.identifier}/>
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