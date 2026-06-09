'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Student } from "@/types/student";
import { Classroom } from "@/types/classroom";

import { createStudent } from "@/services/student.service";
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
    initialData?: Student;
}

export default function StudentForm({ initialData }: Props) {

    const supabase = browserClient();
    const router = useRouter();

    const [name, setName] = useState(initialData?.name || "");
    const [classroomId, setClassroomId] = useState(initialData?.classroomId || "");
    const [classroms, setClassrooms] = useState<Classroom[]>([]);
    const [enrollment, setEnrollment] = useState(initialData?.enrollment || "");    
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

            const student = await createStudent(supabase, {
                name,
                classroomId,
                enrollment
            });

            success("Aluno criado com sucesso.");
            router.push(`/alunos/${student.id}?mode=draft`);

        } catch(e) {

            console.error(e);
            error("Não foi possível criar o aluno.");

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

            <div className="w-20">
                <Button disabled={loading} type="submit">
                    {loading ? "Salvando..." : "Salvar"}
                </Button>
            </div>
        </Form>
    );
}