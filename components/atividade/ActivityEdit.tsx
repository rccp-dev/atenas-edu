"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Activity } from "@/types/activity";
import { Classroom } from "@/types/classroom";
import { updateActivity, deleteActivity } from "@/services/activity.service";
import { getClassrooms, getClassroomById, getClassroomDisplayName } from "@/services/classroom.service";

import Edit from "@/components/ui/Edit";
import Form from "@/components/ui/Form";

import Field from "@/components/ui/Field";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import Confirm from "@/components/ui/Confirm";
import { Button } from "../ui/Button";

import { success, error } from "@/lib/ui/toast";

import { browserClient } from "@/lib/supabase/browser";


interface Props {
    activity: Activity;
}

export default function ActivityEdit({ activity }: Props) {

    const supabase = browserClient();
    const router = useRouter();

    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [openBack, setOpenBack] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [classrooms, setClassrooms] = useState<Classroom[]>([]);
    const [classroomName, setClassroomName] = useState("");

    const [title, setTitle] = useState(activity.title);
    const [classroomId, setClassroomId] = useState(activity.classroomId);
    const [deadline, setDeadline] = useState(activity.deadline?.split("T")[0] ?? "");
    const [attachments, setAttachments] = useState(activity.attachments?.join("\n") || "");
    const [description, setDescription] = useState(activity.description);
    
    useEffect(() => {

        async function loadData() {

            if (!activity.classroomId) {
                return;
            }

            const [classroomsData, classroomData] = await Promise.all([
                getClassrooms(supabase),
                getClassroomById(supabase, activity.classroomId),
            ]);

            setClassrooms(classroomsData);

            if (!classroomData) {
                return;
            }

            setClassroomName(getClassroomDisplayName(classroomData));

        }

        loadData();

    }, [activity.classroomId]);

    async function handleUpdate(event: React.FormEvent<HTMLFormElement>) {

        event.preventDefault();

        try {

            setSaving(true);

            await updateActivity(supabase, activity.id, {
                title,
                classroomId,
                deadline,
                attachments: attachments ? attachments.split("\n").filter(Boolean) : [],
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

            await deleteActivity(supabase, activity.id);

            success("Atividade excluída com sucesso.");
            router.push(`/atividades/`);

        } catch(e) {
            
            console.error(e);
            error("Não foi possível excluir.");
            
        } finally {

            setDeleting(false);

        }

    }

    return (
        <Edit>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-foreground">
                    Editar atividade
                </h1>

                <p className="mt-2 text-secondary">
                    {classroomName || ""}
                </p>
            </div>

            <Form onSubmit={handleUpdate}>
                <div className="flex flex-col gap-4">

                    <Field label="Título">
                        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
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

                    <Field label="Prazo">
                        <Input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
                    </Field>

                    <Field label="Anexos">
                        <Textarea value={attachments} onChange={(e) => setAttachments(e.target.value)} placeholder="Um link por linha..." />
                    </Field>

                    <Field label="Descrição">
                        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                    </Field>

                </div>

                <div className="mt-8 flex gap-3">
                    <Button onClick={() => setOpenBack(true)}>
                        Voltar
                    </Button>

                    <Confirm
                        open={openBack}
                        title="Deseja voltar?"
                        description="As alterações realizadas serão perdidas se não estiverem salvas."
                        variant="warning"
                        onCancel={() => setOpenBack(false)}
                        onConfirm={() => {
                            setOpenBack(false);
                            window.location.href = "?mode=view"}
                        }
                    />

                    <Button type="submit" disabled={saving}>
                        {saving ? "Salvando..." : "Salvar alterações"}
                    </Button>

                    <Button type="button" variant="secondary" disabled={deleting} onClick={() => setOpenDelete(true)}>
                        {deleting ? "Excluindo..." : "Excluir"}
                    </Button>

                    <Confirm
                        open={openDelete}
                        title="Excluir atividade?"
                        description="Essa ação não poderá ser desfeita."
                        variant="danger"
                        onCancel={() => setOpenDelete(false)}
                        onConfirm={handleDelete}
                    />
                </div>
            </Form>
        </Edit>
    );
}