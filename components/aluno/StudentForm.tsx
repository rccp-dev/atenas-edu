'use client';

import { useEffect, useState } from "react";

import { Student } from "@/types/student";
import { Classroom } from "@/types/classroom";

import { createStudent } from "@/services/student.service";
import { getClassrooms } from "@/services/classroom.service";

import Form from "@/components/ui/Form";
import Field from "@/components/ui/Field";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";

interface Props {
    initialData?: Student;
}

export default function StudentForm({ initialData }: Props) {

    const [name, setName] = useState(
        initialData?.name || ""
    );

    const [classroomId, setClassroomId] = useState(
        initialData?.classroomId || ""
    );

    const [relatedItems, setRelatedItems] = useState<
        Classroom[]
    >([]);

    const [enrollment, setEnrollment] = useState(
        initialData?.enrollment || ""
    );

    const [content, setContent] = useState(
        initialData?.content || ""
    );

    useEffect(() => {

        async function loadRelatedItems() {
            const data = await getClassrooms();
            setRelatedItems(data);
        }

        loadRelatedItems();

    }, []);

    async function handleSubmit() {

        await createStudent({
            name,
            classroomId,
            enrollment,
            content,
        });

    }

    return (
        <Form>
            <div className="flex flex-col gap-4 w-sm">

                <Field label="Nome">
                    <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome do aluno..."/>
                </Field>

                <Field label="Turma">
                    <Select value={classroomId} onChange={(e) => setClassroomId(e.target.value)}>

                        <option value="">Selecione uma turma</option>

                        {relatedItems.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}

                    </Select>
                </Field>

                <Field label="Matrícula">
                    <Input 
                        value={enrollment} onChange={(e) => setEnrollment(e.target.value)}
                        placeholder="Insira a matrícula do aluno..."
                    />
                </Field>

            </div>

            <Field label="Conteúdo">
                <Textarea
                    value={content} onChange={(e) => setContent(e.target.value)}
                    placeholder="Escreva qualquer anotação aqui..." className="min-h-50"
                />
            </Field>

            <div className="w-20">
                <Button type="submit" onClick={handleSubmit}>Salvar</Button>
            </div>
        </Form>
    );
}