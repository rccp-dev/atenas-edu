import ClassroomList from "@/components/turma/ClassroomList";
import { getClassrooms } from "@/services/classroom.service";

import { Button } from "@/components/ui/Button";

import { serverClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function TurmasPage() {
  
  const supabase = await serverClient();
  const classrooms = await getClassrooms(supabase);

  return (
    <main className="px-6 py-10">
      <section className="mx-auto max-w-5xl">

        <div className="mb-8 flex items-center justify-between">

          <div>

            <h1 className="text-3xl font-bold text-foreground">
              Turmas
            </h1>

            <p className="mt-2 text-sm text-secondary">
              Gerencie suas turmas cadastradas.
            </p>

          </div>

          <Button href="/turmas/nova-turma">
            Nova turma
          </Button>
          
        </div>

        <ClassroomList classroom={classrooms} />
        
      </section>
    </main>
  );
}
