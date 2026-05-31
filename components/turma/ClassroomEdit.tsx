'use client';

import { useState } from "react";

import { Classroom } from "@/types/classroom";
import { getClassroomDisplayName, updateClassroom } from "@/services/classroom.service";

import Edit from "@/components/ui/Edit";
import Form from "@/components/ui/Form";

import Field from "@/components/ui/Field";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import { Button } from "../ui/Button";

import { browserClient } from "@/lib/supabase/browser";

interface Props {
    classroom: Classroom;
};

export default function ClassroomEdit({ classroom }: Props) {

    const supabase = browserClient();

    const [saving, setSaving] = useState(false);

    const [grade, setGrade] = useState(classroom.grade);
    const [section, setSection] = useState(classroom.section);
    const [description, setDescription] = useState(classroom.description);

    const classroomName = getClassroomDisplayName(classroom);

    async function handleUpdate(event: React.FormEvent<HTMLFormElement>) {

        event.preventDefault();

        try {

            setSaving(true);

            await updateClassroom(supabase, classroom.id, {
                grade,
                section,
                description,
            });

        } finally {

            setSaving(false);

        }

    }

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

            <Form onSubmit={handleUpdate}>
                <div className="flex flex-col gap-4">

                    <Field label="Ano">
                        <Input value={grade} type="number" onChange={(e) => setGrade(Number(e.target.value))} placeholder="Ano" />
                    </Field>

                    <Field label="Série">
                        <Input value={section} onChange={(e) => setSection(e.target.value)} />
                    </Field>

                    <Field label="Descrição">
                        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                    </Field>

                </div>

                <div className="mt-8 flex gap-3">
                    <Button href="?mode=view">Voltar</Button>

                    <Button type="submit" disabled={saving}>
                        {saving ? "Salvando..." : "Salvar alterações"}
                    </Button>
                </div>
            </Form>
        </Edit>
    );
}