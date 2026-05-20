import { Student } from "@/types/student";
import { getClassrooms, getClassroomById } from "@/services/classroom.service";

import Edit from "@/components/ui/Edit";
import Field from "@/components/ui/Field";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import { Button } from "../ui/Button";

interface Props {
    student: Student;
};

export default async function StudentEdit({ student }: Props) {

    if (!student.classroomId) {
        return null;
    }

    const classrooms = await getClassrooms();
    const classroom = await getClassroomById(student.classroomId);

    return (
        <Edit>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-foreground">
                    Editar registro
                </h1>

                <p className="mt-2 text-secondary">
                    {classroom?.name}
                </p>
            </div>

            <div className="flex flex-col gap-4">

                <Field label="Nome">
                    <Input defaultValue={student.name}/>
                </Field>

                <Field label="Matrícula">
                    <Input defaultValue={student.enrollment}/>
                </Field>

                <Field label="Turma">
                    <Select defaultValue={student.classroomId}                    >

                        <option value="">Selecione uma turma</option>

                        {classrooms.map((classroom) => (
                            <option key={classroom.id} value={classroom.id}>
                                {classroom.name}
                            </option>
                        ))}

                    </Select>
                </Field>

                <Field label="Conteúdo">
                    <Textarea defaultValue={student.content} className="min-h-50"/>
                </Field>

            </div>

            <div className="mt-8 flex gap-3">
                <Button href="?mode=view">Voltar</Button>
                <Button>Salvar alterações</Button>
            </div>
        </Edit>
    );
}