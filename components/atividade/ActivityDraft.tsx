'use client';

import { useState } from "react";

import { Activity } from "@/types/activity";
import { updateActivity } from "@/services/activity.service";

import Draft from "@/components/ui/Draft";
import Form from "@/components/ui/Form";

import Field from "@/components/ui/Field";
import Textarea from "@/components/ui/Textarea";
import Confirm from "@/components/ui/Confirm";
import { Button } from "../ui/Button";

import { success, error } from "@/lib/ui/toast";

import { browserClient } from "@/lib/supabase/browser";


interface Props {
    activity: Activity;
}

export default function ActivityDraft({ activity }: Props) {

    const supabase = browserClient();

    const [open, setOpen] = useState(false);
    const [saving, setSaving] = useState(false);
    const [description, setDescription] = useState(activity.description);
    const [attachments, setAttachments] = useState<string[]>(activity.attachments || []);

    async function handleUpdate(event: React.FormEvent<HTMLFormElement>) {

        event.preventDefault();

        try {

            setSaving(true);

            await updateActivity(supabase, activity.id, {
                description,
                attachments,
            });

            success("Atividade salva com sucesso.");

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