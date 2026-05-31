import StudentList from "@/components/aluno/StudentList";
import { getStudents } from "@/services/student.service";
import { Button } from "@/components/ui/Button";

import { serverClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const supabase = await serverClient();

export default async function StudentPage() {

  const student  = await getStudents(supabase);

  return (
    <main className="min-h-screen px-6 py-10">
	      <section className="mx-auto max-w-5xl rounded-2xl border border-border 
											      bg-surface p-8 shadow-sm">
        
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Alunos
            </h1>

            <p className="mt-2 text-secondary">
              Acompanhe os alunos de cada turma
            </p>
          </div>

          <Button href="/alunos/novo-aluno">
            Novo
          </Button>
        </div>

        <StudentList students={student} />
      </section>
    </main>
  );
}