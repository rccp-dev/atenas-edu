'use client';

import { useEffect, useState } from "react";

import { LessonPlan, Subject, subject_options } from "@/types/lessonPlan";
import { Classroom } from "@/types/classroom";

import { createLessonPlan } from "@/services/lessonPlan.service";
import { getClassroomDisplayName, getClassrooms } from "@/services/classroom.service";

import Form from "@/components/ui/Form";
import Field from "@/components/ui/Field";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import { Button } from "../ui/Button";

interface Props {
    initialData?: LessonPlan;
}

export default function LessonPlanForm({ initialData, }: Props) {

    const [title, setTitle] = useState(
        initialData?.title || ""
    );

    const [subjects, setSubjects] = useState(
        initialData?.subjects || []
    );

    const [classroomId, setClassroomId] = useState(
        initialData?.classroomId || ""
    );

    const [classrooms, setClassrooms] = useState<
        Classroom[]
    >([]);

    const [description, setDescription] = useState(
        initialData?.description || ""
    );

    const [content, setContent] = useState(
        initialData?.content || ""
    );

    useEffect(() => {

        async function loadClassrooms() {
            const data = await getClassrooms();
            setClassrooms(data);
        }

        loadClassrooms();

    }, []);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        try {

            await createLessonPlan({
                title,
                subjects,
                classroomId,
                description,
                content,
            });

        } catch(error) {

            console.error(error);

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

            <Field label="Descrição">
                <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descrição..."/>
            </Field>

            <Field label="Conteúdo">
                <Textarea
                    value={content} onChange={(e) => setContent(e.target.value)}
                    placeholder="Escreva aqui..." className="min-h-50"
                />
            </Field>

            <div className="w-20">
                <Button type="submit">Salvar</Button>
            </div>
        </Form>
    );
}