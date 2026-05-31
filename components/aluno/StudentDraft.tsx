'use client';

import { useState } from "react";

import { Student } from "@/types/student";

import { updateStudent } from "@/services/student.service";

import Draft from "@/components/ui/Draft";
import Form from "@/components/ui/Form";

import Field from "@/components/ui/Field";
import Textarea from "@/components/ui/Textarea";
import { Button } from "../ui/Button";

import { browserClient } from "@/lib/supabase/browser";

interface Props {
    student: Student;
}

export default function StudentDraft({ student }: Props) {

    const supabase = browserClient();

    const [saving, setSaving] = useState(false);

    const [content, setContent] = useState(
        student.content || ""
    );

    async function handleUpdate(event: React.FormEvent<HTMLFormElement>) {

        event.preventDefault();

        try {

            setSaving(true);

            await updateStudent(supabase, student.id, {
                content,
            });

        } finally {

            setSaving(false);

        }

    }

    return (
        <Draft>

            <div className="mb-6">
                <h1 className="text-3xl font-bold text-foreground">
                    Complete as informações
                </h1>

                <p className="mt-2 text-secondary">
                    Você pode complementar os dados agora ou voltar depois.
                </p>
            </div>

            <Form onSubmit={handleUpdate}>

                <Field label="Conteúdo">
                    <Textarea
                        value={content} onChange={(e) => setContent(e.target.value)}
                        placeholder="Escreva qualquer anotação aqui..." className="min-h-50"
                    />
                </Field>

                <div className="mt-8 flex gap-3">
                    <Button href="?mode=view">
                        Pular por enquanto
                    </Button>

                    <Button type="submit" disabled={saving}>
                        {saving ? "Salvando..." : "Salvar alterações"}
                    </Button>
                </div>

            </Form>

        </Draft>
    );
}