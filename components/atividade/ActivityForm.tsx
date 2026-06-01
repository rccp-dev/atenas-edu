'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Activity } from "@/types/activity";
import { Classroom } from "@/types/classroom";

import { createActivity } from "@/services/activity.service";
import { getClassroomDisplayName, getClassrooms } from "@/services/classroom.service";

import Form from "@/components/ui/Form";
import Field from "@/components/ui/Field";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { Button } from "../ui/Button";

import { error, success } from "@/lib/ui/toast";
import { requireValue } from "@/lib/validation/requireValue";

import { browserClient } from "@/lib/supabase/browser";


interface Props {
    activity?: Activity;
}

export default function ActivityForm({ activity }: Props) {

    const supabase = browserClient();
    const router = useRouter();

    const [title, setTitle] = useState(activity?.title || "");
    const [deadline, setDeadline] = useState(activity?.deadline || "");
    const [classroomId, setClassroomId] = useState(activity?.classroomId || "");
    const [classrooms, setClassrooms] = useState<Classroom[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        async function loadClassrooms() {
            const data = await getClassrooms(supabase);
            setClassrooms(data);
        }

        loadClassrooms();

    }, []);

    function generateToken() {

        return crypto.randomUUID();

    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        
        event.preventDefault();
        
        try {

            setLoading(true);

            if (!requireValue(classroomId, "Selecione uma turma.")) {
                return;
            }

            if (!requireValue(deadline, "Informe um prazo.")) {
                return;
            }

            const activity = await createActivity(supabase, {
                title,
                classroomId,
                deadline,
                token: generateToken(),
                status: "Atribuída"
            });

            success("Atividade criada com sucesso");
            router.push(`/atividades/${activity.id}?mode=draft`);
            

        } catch(e) {
            
            console.error(e);
            error("Não foi possível criar a atividade.")
            
        } finally {

            setLoading(false);

        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 w-sm">

                <Field label="Título">
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Nova atividade..."/>
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
                    <Input 
                        type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} 
                        placeholder="Prazo de entrega"
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