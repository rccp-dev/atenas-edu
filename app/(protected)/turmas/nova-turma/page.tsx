import ClassroomForm from "@/components/turma/ClassroomForm";

export const dynamic = "force-dynamic";

export default function NovaTurmaPage() {

    return (
        <main className="flex justify-center items-center min-h-screen px-4">
            <section className="w-full max-w-3xl rounded-2xl border border-border bg-surface p-8 shadow-sm">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">
                        Criar nova turma
                    </h1>

                    <p className="mt-2 text-secondary">
                        Cadastre uma nova turma na plataforma.
                    </p>
                </div>

                <ClassroomForm />

            </section>
        </main>
    );
}