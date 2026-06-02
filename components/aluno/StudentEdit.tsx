'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Student } from "@/types/student";
import { Classroom } from "@/types/classroom";
import { getClassrooms, getClassroomById, getClassroomDisplayName } from "@/services/classroom.service";
import { updateStudent, deleteStudent } from "@/services/student.service";

import Edit from "@/components/ui/Edit";
import Form from "@/components/ui/Form";

import Field from "@/components/ui/Field";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import { Button } from "../ui/Button";

import { success, error } from "@/lib/ui/toast";

import { browserClient } from "@/lib/supabase/browser";

interface Props {
    student: Student;
};

export default function StudentEdit({ student }: Props) {

    const supabase = browserClient();
    const router = useRouter();

    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [open, setOpen] = useState(false);

    const [classrooms, setClassrooms] = useState<Classroom[]>([]);
    const [classroomName, setClassroomName] = useState("");

    const [name, setName] = useState(student.name);
    const [enrollment, setEnrollment] = useState(student.enrollment);
    const [classroomId, setClassroomId] = useState(student.classroomId);
    const [content, setContent] = useState(student.content || "");

    useEffect(() => {

        async function loadData() {

            if (!student.classroomId) {
                return;
            }

            const [classroomsData, classroomData] = await Promise.all([
                getClassrooms(supabase),
                getClassroomById(supabase, student.classroomId),
            ]);

            setClassrooms(classroomsData);

            if (!classroomData) {
                return;
            }

            setClassroomName(
                getClassroomDisplayName(classroomData)
            );

        }
        
        loadData();

    }, [student.classroomId]);

    async function handleUpdate(event: React.FormEvent<HTMLFormElement>) {

        event.preventDefault();

        try {

            setSaving(true);

            await updateStudent(supabase, student.id, {
                name,
                enrollment,
                classroomId,
                content
            });

            success("Alterações salvas com sucesso.");

        } catch(e) {

            console.error(e);
            error("Não foi possível salvar as alterações.");

        } finally {

            setSaving(false);

        }

    }

    async function handleDelete() {

        try {

            setDeleting(true);

            await deleteStudent(supabase, student.id);
            success("Aluno excluído com sucesso.");
            router.push(`/alunos/`);

        } catch(e) {

            console.error(e);
            error("Não foi possível excluir o aluno.");

        } finally {

            setDeleting(false);
            setOpen(false);

        }

    }

    return (
        <Edit>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-foreground">
                    Editar registro
                </h1>

                <p className="mt-2 text-secondary">
                    {classroomName || ""}
                </p>
            </div>

            <Form onSubmit={handleUpdate}>
                <div className="flex flex-col gap-4">

                    <Field label="Nome">
                        <Input value={name} onChange={(e) => setName(e.target.value)} />
                    </Field>

                    <Field label="Matrícula">
                        <Input value={enrollment} onChange={(e) => setEnrollment(e.target.value)} />
                    </Field>

                    <Field label="Turma">
                        <Select value={classroomId} onChange={(e) => setClassroomId(e.target.value)}>

                            <option value="">Selecione uma turma</option>

                            {classrooms.map((classroom) => (
                                <option key={classroom.id} value={classroom.id}>
                                    {getClassroomDisplayName(classroom)}
                                </option>
                            ))}

                        </Select>
                    </Field>

                    <Field label="Conteúdo">
                        <Textarea value={content} onChange={(e) => setContent(e.target.value)} className="min-h-50" />
                    </Field>

                </div>

                <div className="mt-8 flex gap-3">
                    <Button href="?mode=view">Voltar</Button>

                    <Button type="submit" disabled={saving}>
                        {saving ? "Salvando..." : "Salvar alterações"}
                    </Button>

                    <Button type="button" variant="secondary" disabled={deleting} onClick={() => setOpen(true)}>
                        {deleting ? "Excluindo..." : "Excluir"}
                    </Button>

                    <Confirm
                        open={open}
                        title="Excluir atividade?"
                        description="Essa ação não poderá ser desfeita."
                        variant="danger"
                        onCancel={() => setOpen(false)}
                        onConfirm={handleDelete}
                    />
                </div>
            </Form>
        </Edit>
    );
}