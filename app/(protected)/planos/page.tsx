import LessonPlanList from "@/components/plano/LessonPlanList";
import { getLessonPlans } from "@/services/lessonPlan.service";
import { Button } from "@/components/ui/Button";

import { serverClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const supabase = await serverClient();

export default async function PlanosPage() {

    const plans = await getLessonPlans(supabase);

    return (
        <main className="min-h-screen px-6 py-10">
            <section className="mx-auto max-w-5xl rounded-2xl border border-border bg-surface p-8 shadow-sm">
                
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">
                            Planos de aula
                        </h1>

                        <p className="mt-2 text-secondary">
                            Gerencie planejamentos, conteúdos e organização acadêmica.
                        </p>
                    </div>

                    <Button href="/planos/novo-plano">Novo plano</Button>
                </div>

                <LessonPlanList plans={plans} />
            </section>
        </main>
    );
}