import StudentList from "@/components/aluno/StudentList";
import { getStudents } from "@/services/student.service";
import { Button } from "@/components/ui/Button";

import { serverClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function StudentPage() {

  const supabase = await serverClient();
  const students = await getStudents(supabase);

  return (
    <main className="min-h-screen px-6 py-10 bg-background">
      <section className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between">

          <div>

            <h1 className="text-3xl font-bold text-foreground">
              Alunos
            </h1>

            <p className="mt-2 text-sm text-secondary">
              Acompanhe os alunos de cada turma
            </p>

          </div>

          <Button href="/alunos/novo-aluno">
            Novo
          </Button>

        </div>

        <StudentList students={students} />

      </section>
    </main>
  );
}
