'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { LessonPlan, Subject, subject_options } from "@/types/lessonPlan";
import { Classroom } from "@/types/classroom";

import { createLessonPlan } from "@/services/lessonPlan.service";
import { getClassroomDisplayName, getClassrooms } from "@/services/classroom.service";

import Form from "@/components/ui/Form";
import Field from "@/components/ui/Field";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { Button } from "../ui/Button";

import { success, error } from "@/lib/ui/toast";
import { requireValue } from "@/lib/validation/requireValue";

import { browserClient } from "@/lib/supabase/browser";

interface Props {
    initialData?: LessonPlan;
}

export default function LessonPlanForm({ initialData, }: Props) {

    const supabase = browserClient();
    const router = useRouter();

    const [title, setTitle] = useState(initialData?.title || "");
    const [subjects, setSubjects] = useState(initialData?.subjects || []);
    const [classroomId, setClassroomId] = useState(initialData?.classroomId || "");
    const [classrooms, setClassrooms] = useState<Classroom[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        async function loadClassrooms() {
            const data = await getClassrooms(supabase);
            setClassrooms(data);
        }

        loadClassrooms();

    }, []);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        
        event.preventDefault();

        try {

            setLoading(true);

            if (!requireValue(classroomId, "Selecione uma turma.")) {
                return;
            }

            const lessonPlan = await createLessonPlan(supabase, {
                title,
                subjects,
                classroomId
            });

            success("Plano criado com sucesso.");
            router.push(`/planos/${lessonPlan.id}?mode=draft`);

        } catch(e) {

            console.error(e);
            error("Não foi possível criar o plano.");

        } finally {

            setLoading(false);

        }

    }

    return (
        <Form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 w-sm">

                <Field label="Título">
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Novo plano de aula..."/>
                </Field>

                <Field label="Matérias">
                    <Select 
                        multiple value={subjects}
                        onChange={(e) => {

                            const values = Array.from(
                                e.target.selectedOptions,
                                (opt) => opt.value as Subject
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
                    <Select value={classroomId} onChange={(e) => setClassroomId(e.target.value)}>

                        <option value="">Selecione uma turma</option>

                        {classrooms.map((classroom) => (
                            <option key={classroom.id} value={classroom.id}>
                                {getClassroomDisplayName(classroom)}
                            </option>
                        ))}

                    </Select>
                </Field>

            </div>

            <div className="w-20">
                <Button disabled={loading} type="submit">
                    {loading ? "Salvando..." : "Salvar"}
                </Button>
            </div>
        </Form>
    );
}