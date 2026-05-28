'use client';

import { useState } from "react";

import Form from "@/components/ui/Form";
import Field from "@/components/ui/Field";

import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";

import { Button } from "../ui/Button";
import { createClassroom } from "@/services/classroom.service";

export default function ClassroomForm() {

    const [grade, setGrade] = useState<number>(0);
    const [section, setSection] = useState("");
    const [description, setDescription] = useState("");

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        try {

            await createClassroom({
                grade,
                section,
                description,
            });

        } catch(error) {

            console.error(error);

        }

    }

    return (
        <Form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 w-sm">

                <Field label="Ano">
                    <Input value={grade} type="number" onChange={(e) => setGrade(Number(e.target.value))} placeholder="Ano"/>
                </Field>

                <Field label="Série">
                    <Input value={section} onChange={(e) => setSection(e.target.value)} placeholder="Série"/>
                </Field>

            </div>

            <Field label="Descrição">
                <Textarea
                    value={description} onChange={(e) => setDescription(e.target.value)}
                    placeholder="Descrição..." className="min-h-40"
                />
            </Field>

            <div className="w-24">
                <Button type="submit">Salvar</Button>
            </div>
        </Form>
    );
}