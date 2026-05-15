import Link from "next/link";
import { getLessonPlans } from "@/services/lessonPlan.service";
import { Button } from "@/components/ui/button";

export default async function PlanosPage() {
  const plans = await getLessonPlans();
  console.log(plans);

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

          <Button href="/planos/novo">
            Novo plano
          </Button>
        </div>

        <div className="grid gap-4">
          {plans.map((plan) => (
            <Link
              key={plan.id}
              href={`/planos/${plan.id}`}
              className="rounded-xl border border-border bg-background p-5 transition-opacity hover:opacity-90"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  {plan.title || "Sem título"}
                </h2>

                <span className="text-sm text-secondary">
                  {plan.createdAt}
                </span>
              </div>

              <p className="mt-3 text-secondary">
                {plan.description}
              </p>

              <div className="mt-4 flex gap-2">
                {plan.subjects.map((subject) => (
                  <span
                    key={subject}
                    className="rounded-md bg-primary px-2 py-1 text-sm text-light"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

      </section>
    </main>
  );
}