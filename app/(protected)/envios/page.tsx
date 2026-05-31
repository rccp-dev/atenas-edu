import SubmissionList from "@/components/envio/SubmissionList";
import { getSubmissions } from "@/services/submission.service";

import { serverClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const supabase = await serverClient();

export default async function SubmissionPage() {
  const submissions = await getSubmissions(supabase);

  return (
    <main className="min-h-screen px-6 py-10">
	      <section className="mx-auto max-w-5xl rounded-2xl border border-border bg-surface p-8 shadow-sm">
        
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Envios
              </h1>

              <p className="mt-2 text-secondary">
                Gerencie envios de trabalhos.
              </p>
            </div>
          </div>

        <SubmissionList submissions={submissions} />
      </section>
    </main>
  );
}