import { Classroom } from "@/types/classroom";
import { Button } from "@/components/ui/Button";

type Props = {
    turma: Classroom;
    students: any[];
};

export default function ClassroomView({ turma, students }: Props) {

  return (
    <main className="min-h-screen px-6 py-10 space-y-6">
        <div className="space-y-2">
            <div className="flex justify-between itemsc-center">
                <h1 className="text-4xl font-bold">
                    {turma.nome}
                </h1>

                <Button href="?mode=edit">Editar</Button>
            </div>

            {turma.descricao && (
                <p>{turma.descricao}</p>
            )}
        </div>

        <section className="space-y-4">
            <h2 className="text-xl font-semibold">
                Alunos
            </h2>

            <div className="space-y-3">
                {students.map((student) => (
                    <div key={student.id} className="rounded-2xl border border-border p-4">
                        <h3 className="font-medium">{student.nome}</h3>

                        <p className="text-sm text-muted-foreground">
                            Matrícula: {student.matricula}
                        </p>

                        {student.conteudo && (
                            <p className="mt-3 text-sm">
                                {student.conteudo}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </section>
    </main>
  );
}