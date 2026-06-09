import LessonPlanList from "@/components/plano/LessonPlanList";
import { getLessonPlans } from "@/services/lessonPlan.service";

import { Button } from "@/components/ui/Button";

import { serverClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function PlanosPage() {

  const supabase = await serverClient();
  const plans = await getLessonPlans(supabase);

  return (
    <main className="px-6 py-10">
      <section className="mx-auto max-w-5xl">

        <div className="mb-8 flex items-center justify-between">

          <div>

            <h1 className="text-3xl font-bold text-foreground">
              Planos de aula
            </h1>

            <p className="mt-2 text-sm text-secondary">
              Gerencie planejamentos, conteúdos e organização acadêmica.
            </p>

          </div>

          <Button href="/planos/novo-plano">
            Novo plano
          </Button>

        </div>

        <LessonPlanList plans={plans} />

      </section>
    </main>
  );
}
