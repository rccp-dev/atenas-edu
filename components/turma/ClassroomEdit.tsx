'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Classroom } from "@/types/classroom";
import { getClassroomDisplayName, updateClassroom, deleteClassroom } from "@/services/classroom.service";

import Edit from "@/components/ui/Edit";
import Form from "@/components/ui/Form";

import Field from "@/components/ui/Field";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Confirm from "@/components/ui/Confirm";
import { Button } from "../ui/Button";

import { success, error } from "@/lib/ui/toast";
import { browserClient } from "@/lib/supabase/browser";

interface Props {
    classroom: Classroom;
};

export default function ClassroomEdit({ classroom }: Props) {

    const supabase = browserClient();
    const router = useRouter();

    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [open, setOpen] = useState(false);
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

            await deleteClassroom(supabase, classroom.id);

            success("Turma excluída com sucesso.");
            router.push(`/turmas/`);

        } catch(e) {

            console.error(e);
            error("Não foi possível excluir a turma.");

        } finally {

            setDeleting(false);

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
                    <Button onClick={() => setOpen(true)}>
                        Voltar
                    </Button>

                    <Confirm
                        open={open}
                        title="Deseja voltar?"
                        description="As alterações realizadas serão perdidas se não estiverem salvas."
                        variant="warning"
                        onCancel={() => setOpen(false)}
                        onConfirm={() => {
                            setOpen(false);
                            window.location.href = "?mode=view"}
                        }
                    />

                    <Button type="submit" disabled={saving}>
                        {saving ? "Salvando..." : "Salvar alterações"}
                    </Button>

                    <Button type="button" variant="secondary" disabled={deleting} onClick={() => setOpen(true)}>
                        {deleting ? "Excluindo..." : "Excluir"}
                    </Button>

                    <Confirm
                        open={open}
                        title="Excluir turma?"
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