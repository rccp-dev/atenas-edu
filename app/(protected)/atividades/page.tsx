import ActivityList from "@/components/atividade/ActivityList";
import { getActivities } from "@/services/activity.service";
import { Button } from "@/components/ui/Button";

import { serverClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const supabase = await serverClient();

export default async function ActivityPage() {
  const activities = await getActivities(supabase);

  return (
    <main className="min-h-screen px-6 py-10">
      <section className="mx-auto max-w-5xl rounded-2xl border border-border bg-surface p-8 shadow-sm">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Atividades</h1>

            <p className="mt-2 text-secondary">
              Crie e corrija atividades.
            </p>
          </div>

          <Button href="/atividades/nova-atividade">Novo</Button>
        </div>

        <ActivityList activities={activities} />
      </section>
    </main>
  );
}