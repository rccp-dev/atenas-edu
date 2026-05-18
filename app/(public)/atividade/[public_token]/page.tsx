import SubmissionForm from "@/components/envio/SubmissionForm";

interface Props {
  params: Promise<{
    public_token: string;
  }>;
}

export default async function NewEntityPage({ params }: Props) {
  const { public_token } = await params;

  return (
    <main className="flex justify-center items-center min-h-screen px-4 py-10">
      <section className="w-full max-w-4xl rounded-2xl border border-border bg-surface p-8 shadow-sm">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Enviar atividade</h1>

          <p className="mt-2 text-secondary">Preencha os dados necessários.</p>
        </div>

        <SubmissionForm />
      </section>
    </main>
  );
}
