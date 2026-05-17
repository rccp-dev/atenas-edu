import { notFound } from "next/navigation";
import LessonPlanForm from "@/components/plano/LessonPlanForm";
import { getLessonPlanById } from "@/services/lessonPlan.service";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function LessonPlanPage({
    params,
}: PageProps) {

    const { id } = await params;
    const plan = await getLessonPlanById(id);

    if(!plan) {
        notFound();
    }

    return (

        <main className="flex justify-center items-center min-h-screen px-4 py-10">
            <section className="w-full max-w-4xl rounded-2xl border border-border bg-surface p-8 shadow-sm">

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground">
                        Editar plano de aula
                    </h1>

                    <p className="mt-2 text-secondary">
                        Atualize conteúdos, observações e planejamentos
                    </p>
                </div>

                <LessonPlanForm initialData={plan} />

            </section>
        </main>

    );
    
}