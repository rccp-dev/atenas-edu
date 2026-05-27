"use client";

import { useEffect, useState } from "react";
import { Activity } from "@/types/activity";
import { Classroom } from "@/types/classroom";
import { getClassrooms, getClassroomById, getClassroomDisplayName } from "@/services/classroom.service";

import { updateActivity, deleteActivity } from "@/services/activity.service";

import Edit from "@/components/ui/Edit";
import Field from "@/components/ui/Field";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import { Button } from "../ui/Button";

interface Props {
    activity: Activity;
}

export default function ActivityEdit({ activity }: Props) {

    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const [classrooms, setClassrooms] = useState<Classroom[]>([]);
    const [classroomName, setClassroomName] = useState("");

    const [title, setTitle] = useState(activity.title);
    const [classroomId, setClassroomId] = useState(activity.classroomId);
    const [deadline, setDeadline] = useState(activity.deadline || "");
    const [attachments, setAttachments] = useState(
        activity.attachments?.join("\n") || ""
    );
    const [description, setDescription] = useState(activity.description);

    useEffect(() => {

        async function loadData() {

            try {

                if (!activity.classroomId) {
                    return;
                }

                const [classroomsData, classroomData] = await Promise.all([
                    getClassrooms(),
                    getClassroomById(activity.classroomId),
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

    }, [activity.classroomId]);

    async function handleUpdate() {

        try {

            setSaving(true);

            await updateActivity(activity.id, {
                title,
                classroomId,
                deadline,
                attachments: attachments ? attachments.split("\n").filter(Boolean): [],
                description,
            });

        } finally {
            setSaving(false);
        }

    }

    async function handleDelete() {

        try {

            setDeleting(true);

            await deleteActivity(activity.id);

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