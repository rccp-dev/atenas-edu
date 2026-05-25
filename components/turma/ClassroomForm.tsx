'use client';

import { useState } from "react";

import Form from "@/components/ui/Form";
import Field from "@/components/ui/Field";

import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";

import { Button } from "../ui/Button";
import { createClassroom } from "@/services/classroom.service";

export default function ClassroomForm() {

    const [year, setYear] = useState<number>(0);
    const [grade, setGrade] = useState("");
    const [description, setDescription] = useState("");

    async function handleSubmit() {

        await createClassroom({
            year,
            grade,
            description,
        });

    }

    return (
        <Form>
            <div className="flex flex-col gap-4 w-sm">

                <Field label="Ano">
                    <Input value={year} type="number" onChange={(e) => setYear(Number(e.target.value))} placeholder="Ano"/>
                </Field>

                <Field label="Série">
                    <Input value={grade} onChange={(e) => setGrade(e.target.value)} placeholder="Série"/>
                </Field>

            </div>

            <Field label="Descrição">
                <Textarea
                    value={description} onChange={(e) => setDescription(e.target.value)}
                    placeholder="Descrição..." className="min-h-40"
                />
            </Field>

            <div className="w-24">
                <Button type="submit" onClick={handleSubmit}>Salvar</Button>
            </div>
        </Form>
    );
}