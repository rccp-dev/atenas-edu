'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { notFound } from "next/navigation";
import { LessonPlan } from "@/types/lessonPlan";
import { subject_options } from "@/types/lessonPlan";
import { Classroom } from "@/types/classroom";

import { getClassrooms, getClassroomById, getClassroomDisplayName } from "@/services/classroom.service";

import { updateLessonPlan, deleteLessonPlan } from "@/services/lessonPlan.service";

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
    plan: LessonPlan;
}

export default function LessonPlanEdit({ plan }: Props) {

    const supabase = browserClient();
    const router = useRouter();

    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const [classrooms, setClassrooms] = useState<Classroom[]>([]);
    const [classroomName, setClassroomName] = useState("");

    const [title, setTitle] = useState(plan.title);
    const [subjects, setSubjects] = useState(plan.subjects);
    const [classroomId, setClassroomId] = useState(plan.classroomId);
    const [description, setDescription] = useState(plan.description);
    const [content, setContent] = useState(plan.content);

    useEffect(() => {

        async function loadData() {

            if (!plan.classroomId) {
                notFound();
            }

            const [classroomsData, classroomData] = await Promise.all([
                getClassrooms(supabase),
                getClassroomById(supabase, plan.classroomId),
            ]);

            setClassrooms(classroomsData);

            if (!classroomData) {
                notFound();
            }

            setClassroomName(getClassroomDisplayName(classroomData));

        }

        loadData();

    }, [plan.classroomId]);

    async function handleUpdate(event: React.FormEvent<HTMLFormElement>) {

        event.preventDefault();

        try {

            setSaving(true);

            await updateLessonPlan(supabase, plan.id, {
                title,
                subjects,
                classroomId,
                description,
                content,
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

            await deleteLessonPlan(supabase, plan.id);

            success("Plano excluído com sucesso.");
            router.push(`/planos/`);

        } catch(e) {

            console.error(e);
            error("Não foi possível excluir o plano.");

        } finally {

            setDeleting(false);

        }

    }

    return (
        <Edit>

            <div className="mb-6">
                <h1 className="text-3xl font-bold text-foreground">
                    Editar plano de aula
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

                    <Field label="Matérias">
                        <Select
                            multiple
                            value={subjects}
                            onChange={(e) => {
                                const values = Array.from(
                                    e.target.selectedOptions,
                                    (opt) => opt.value as any
                                );
                                setSubjects(values);
                            }}
                        >
                            {subject_options.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </Select>
                    </Field>

                    <Field label="Turma">
                        <Select
                            value={classroomId}
                            onChange={(e) => setClassroomId(e.target.value)}
                        >
                            <option value="">Selecione uma turma</option>

                            {classrooms.map((classroom) => (
                                <option key={classroom.id} value={classroom.id}>
                                    {getClassroomDisplayName(classroom)}
                                </option>
                            ))}
                        </Select>
                    </Field>

                    <Field label="Descrição">
                        <Textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Field>

                    <Field label="Conteúdo">
                        <Textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="min-h-50"
                        />
                    </Field>

                </div>

                <div className="mt-8 flex gap-3">
                    <Button href="?mode=view">Voltar</Button>

                    <Button type="submit" disabled={saving}>
                        {saving ? "Salvando..." : "Salvar alterações"}
                    </Button>

                    <Button type="button" variant="secondary" disabled={deleting} onClick={handleDelete}>
                        {deleting ? "Excluindo..." : "Excluir"}
                    </Button>
                </div>
            </Form>

        </Edit>
    );
}