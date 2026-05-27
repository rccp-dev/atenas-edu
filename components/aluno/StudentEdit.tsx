"use client";

import { useEffect, useState } from "react";
import { Student } from "@/types/student";
import { Classroom } from "@/types/classroom";
import { getClassrooms, getClassroomById, getClassroomDisplayName } from "@/services/classroom.service";
import { updateStudent, deleteStudent } from "@/services/student.service";

import Edit from "@/components/ui/Edit";
import Field from "@/components/ui/Field";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import { Button } from "../ui/Button";

interface Props {
    student: Student;
};

export default function StudentEdit({ student }: Props) {

    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const [classrooms, setClassrooms] = useState<Classroom[]>([]);
    const [classroomName, setClassroomName] = useState("");

    const [name, setName] = useState(student.name);
    const [enrollment, setEnrollment] = useState(student.enrollment);
    const [classroomId, setClassroomId] = useState(student.classroomId);
    const [content, setContent] = useState(student.content || "");

    useEffect(() => {

        async function loadData() {

            try {

                if (!student.classroomId) {
                    return;
                }

                const [classroomsData, classroomData] = await Promise.all([
                    getClassrooms(),
                    getClassroomById(student.classroomId),
                ]);

                setClassrooms(classroomsData);

                if (!classroomData) {
                    return;
                }

                setClassroomName(
                    getClassroomDisplayName(classroomData)
                );

            }

        }

        loadData();

    }, [student.classroomId]);

    async function handleUpdate() {

        try {

            setSaving(true);

            await updateStudent(student.id, {
                name,
                enrollment,
                classroomId,
                content,
            });

        } finally {

            setSaving(false);

        }

    }

    async function handleDelete() {

        try {

            setDeleting(true);

            await deleteStudent(student.id);

        } finally {

            setDeleting(false);

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

                <Button disabled={saving} onClick={handleUpdate}>
                    {saving ? "Salvando..." : "Salvar alterações"}
                </Button>

                <Button disabled={deleting} onClick={handleDelete}>
                    {deleting ? "Excluindo..." : "Excluir"}
                </Button>
            </div>
        </Edit>
    );
}