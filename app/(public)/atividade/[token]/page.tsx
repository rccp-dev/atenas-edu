import SubmissionForm from "@/components/envio/SubmissionForm";
import SubmissionEdit from "@/components/envio/SubmissionEdit";
import { getSubmissionById } from "@/services/submission.service";
import { getActivityByToken } from "@/services/activity.service";  
import { getActivityStatus } from "@/services/activity.service";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{
        token: string;
    }>;
    searchParams?: {
        mode?: "view" | "edit";
    };
}

export default async function NewEntityPage({ params, searchParams }: PageProps) {

  const { token } = await params;
  const sp = await searchParams;
  const submission = await getSubmissionById(token);

  if (!token || !submission) return notFound();

  const activity = await getActivityByToken(token);
  if (!activity) return notFound();
  const status = await getActivityStatus(activity);
  const mode = sp?.mode ?? "new";

  if (mode === "edit") {
    return <SubmissionEdit submission={submission} />;
  }

  return (
    <main className="flex justify-center items-center min-h-screen px-4 py-10">
      <section className="w-full max-w-4xl rounded-2xl border border-border bg-surface p-8 shadow-sm">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Enviar atividade</h1>

          <p className="mt-2 text-secondary">Preencha os dados necessários.</p>
        </div>

        <SubmissionForm submission={submission} />
      </section>
    </main>
  );
}
