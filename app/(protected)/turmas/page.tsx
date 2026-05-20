import ClassroomList from "@/components/turma/ClassroomList";
import { getClassrooms } from "@/services/classroom.service";
import { Button } from "@/components/ui/Button";

export default async function TurmasPage() {

    const classrooms = await getClassrooms();

    return (
        <main className="min-h-screen px-6 py-10">
            <section className="mx-auto max-w-5xl rounded-2xl border border-border bg-surface p-8 shadow-sm">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">
                            Turmas
                        </h1>

                        <p className="mt-2 text-secondary">
                            Gerencie suas turmas cadastradas.
                        </p>
                    </div>

                    <Button href="/turmas/nova-turma">
                        Nova turma
                    </Button>
                </div>

                <ClassroomList classroom={classrooms}/>
            </section>
        </main>
    );
}