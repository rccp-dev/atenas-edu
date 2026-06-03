'use client';

import { useState } from "react";

import { LessonPlan } from "@/types/lessonPlan";

import { updateLessonPlan } from "@/services/lessonPlan.service";

import Draft from "@/components/ui/Draft";
import Form from "@/components/ui/Form";

import Field from "@/components/ui/Field";
import Textarea from "@/components/ui/Textarea";
import Confirm from "../ui/Confirm";
import { Button } from "../ui/Button";

import { success, error } from "@/lib/ui/toast";

import { browserClient } from "@/lib/supabase/browser";

interface Props {
    plan: LessonPlan;
}

export default function LessonPlanDraft({ plan }: Props) {

    const supabase = browserClient();

    const [open, setOpen] = useState(false);
    const [saving, setSaving] = useState(false);
    const [description, setDescription] = useState(plan.description);
    const [content, setContent] = useState(plan.content);

    async function handleUpdate(event: React.FormEvent<HTMLFormElement>) {

        event.preventDefault();

        try {

            setSaving(true);

            await updateLessonPlan(supabase, plan.id, {
                description,
                content,
            });

            success("Plano salvo com sucesso.");

        } catch (e) {

            console.error(e);
            error("Não foi possível salvar as alterações.");

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

                <Field label="Descrição">
                    <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descrição..." />
                </Field>

                <Field label="Conteúdo">
                    <Textarea
                        value={content} onChange={(e) => setContent(e.target.value)}
                        placeholder="Escreva aqui..." className="min-h-50"
                    />
                </Field>

                <div className="mt-8 flex gap-3">
                    <Button onClick={() => setOpen(true)}>
                        Pular por enquanto
                    </Button>

                    <Confirm
                        open={open}
                        title="Deseja voltar?"
                        description="As alterações realizadas serão perdidas se não estiverem salvas."
                        variant="warning"
                        onCancel={() => setOpen(false)}
                        onConfirm={() => {
                            setOpen(false);
                            window.location.href = "?mode=view"
                        }
                        }
                    />

                    <Button type="submit" disabled={saving}>
                        {saving ? "Salvando..." : "Salvar alterações"}
                    </Button>
                </div>

            </Form>

        </Draft>
    );
}