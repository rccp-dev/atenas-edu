import { TurmaCard } from "@/components/turma/TurmaCard";
import { turmasMock } from "@/mocks/turma.mock";
export default function Turmas() {
    return(
      <main className="space-y-6">
            <div>
                <h1 className="text-2xl font-semibold">
                    Turmas
                </h1>

                <p className="text-sm">
                    Gerencie suas turmas cadastradas.
                </p>
            </div>

         <div className="grid gap-4 md:grid-cols-2">
    {turmasMock.map((turma) => (
        <TurmaCard
            key={turma.id}
            nome={turma.nome}
            serie={turma.serie}
            alunos={turma.alunos}
        />
    ))
    }
    </div> 
        </main>

    );
}