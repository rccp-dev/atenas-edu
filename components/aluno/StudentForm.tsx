'use client';

import { useEffect, useState } from "react";

import { Student } from "@/types/student";
import { Classroom } from "@/types/classroom";

import { createStudent } from "@/services/student.service";
import { getClassroomDisplayName, getClassrooms } from "@/services/classroom.service";

import Form from "@/components/ui/Form";
import Field from "@/components/ui/Field";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import { Button } from "../ui/Button";

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

    const [classroms, setClassrooms] = useState<
        Classroom[]
    >([]);

    const [enrollment, setEnrollment] = useState(
        initialData?.enrollment || ""
    );

    const [content, setContent] = useState(
        initialData?.content || ""
    );
    
    const [loading, setLoading] =
        useState(false);

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

            setLoading(true);

            await createStudent({
                name,
                classroomId,
                enrollment,
                content,
            });

        } catch(error) {

            console.error(error)
            
        } finally {

            setLoading(false);

        }
        
    }

    return (
        <Form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 w-sm">

                <Field label="Nome">
                    <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome do aluno..."/>
                </Field>

                <Field label="Turma">
                    <Select value={classroomId} onChange={(e) => setClassroomId(e.target.value)}>

                        <option value="">Selecione uma turma</option>

                        {classroms.map((classroom) => (
                            <option key={classroom.id} value={classroom.id}>
                                {getClassroomDisplayName(classroom)}
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
                <Button disabled={loading} type="submit">
                    {loading ? "Salvando..." : "Salvar"}
                </Button>
            </div>
        </Form>
    );
}