import SubmissionList from "@/components/envio/SubmissionList";
import { getSubmissions } from "@/services/submission.service";

import { serverClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function SubmissionPage() {
  const supabase = await serverClient();
  const submissions = await getSubmissions(supabase);

  return (
    <main className="px-6 py-10">
      <section className="mx-auto max-w-5xl">

        <div className="mb-8">

          <h1 className="text-3xl font-bold text-foreground">Envios</h1>

          <p className="mt-2 text-sm text-secondary">
            Gerencie envios de trabalhos.
          </p>

        </div>

        <SubmissionList submissions={submissions} />

      </section>
    </main>
  );
}
