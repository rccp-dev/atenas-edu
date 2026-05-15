'use client';

import { useState } from "react";
import { LessonPlan } from "@/types/lessonPlan";
import { createLessonPlan } from "@/services/lessonPlan.service";
import { Subject } from "@/types/lessonPlan";
import { Button } from "../ui/button";

interface LessonPlanFormProps {
  initialData?: LessonPlan;
}

export default function LessonPlanForm({
    initialData,
}: LessonPlanFormProps) {

    const [title, setTitle] = useState(initialData?.title || "");
    const [subjects, setSubjects] = useState(initialData?.subjects || []);    
    /*const classrooms = await getClassrooms();*/ 
    const [description, setDescription] = useState(initialData?.description || "");
    const [content, setContent] = useState(initialData?.content || "");

    const subject_options: Subject[] = [
        "Literatura",
        "Gramática",
        "Redação",
    ];

    async function handleSubmit() {
        await createLessonPlan({
            title,
            subjects,
            /*classroom,*/
            description,
            content,
        });
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 w-sm">
                <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Novo plano de aula..." 
                    className="text-lg rounded-xl border border-border bg-light p-4 outline-none"/>

                {/* select totalmente temporário */}
                <select multiple value={subjects} className="rounded-xl border border-border bg-light p-4 outline-none"
                    onChange={(e) => {
                        const values = Array.from(
                            e.target.selectedOptions,
                            (opt) => opt.value as Subject
                        );

                        setSubjects(values);
                    }}
                >

                {subject_options.map((s) => (
                    <option key={s} value={s}>
                        {s}
                    </option>
                ))}

                </select>
            </div>

            <textarea className="rounded-xl border border-border bg-light p-4 outline-none" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descrição..."/>

            <textarea className="min-h-50 rounded-xl border border-border bg-light p-4 outline-none" 
                value={content} onChange={(e) => setContent(e.target.value)} placeholder="Escreva aqui..."/>

            <div className="w-20">
                <Button type="submit" onClick={handleSubmit}>Salvar</Button>
            </div>
        </div>
    )
}