'use client';

import { useEffect, useState } from "react";

import { Activity } from "@/types/activity";
import { Classroom } from "@/types/classroom";

import { createActivity } from "@/services/activity.service";
import { getClassroomDisplayName, getClassrooms } from "@/services/classroom.service";

import Form from "@/components/ui/Form";
import Field from "@/components/ui/Field";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import { Button } from "../ui/Button";

interface Props {
    activity?: Activity;
}

export default function ActivityForm({ activity }: Props) {

    const [title, setTitle] = useState(
        activity?.title || ""
    );

    const [description, setDescription] = useState(
        activity?.description || ""
    );

    const [deadline, setDeadline] = useState(
        activity?.deadline || ""
    );

    const [attachments, setAttachments] = useState<string[]>(
        activity?.attachments || []
    );

    const [classroomId, setClassroomId] = useState(
        activity?.classroomId || ""
    );

    const [classrooms, setClassrooms] = useState<
        Classroom[]
    >([]);

    useEffect(() => {

        async function loadClassrooms() {
            const data = await getClassrooms();
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

            await createActivity({
                title,
                description,
                classroomId,
                deadline,
                attachments,
                token: generateToken(),
                status: "Atribuída",
            });

        } catch(error) {
            
            console.error(error);
            
        }

    }

    return (
        <Form>
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

            <Field label="Descrição">
                <Textarea 
                    value={description} onChange={(e) => setDescription(e.target.value)}
                    placeholder="Descrição da atividade..."
                />
            </Field>

            <Field label="Anexos">
                <Textarea
                    value={attachments.join("\n")} placeholder="Um link por linha..."
                    onChange={(e) =>
                        setAttachments(
                            e.target.value
                                .split("\n")
                                .filter(Boolean)
                        )
                    }
                />
            </Field>

            <div className="w-20">
                <Button type="submit" onClick={handleSubmit}>Salvar</Button>
            </div>
        </Form>
    );
}