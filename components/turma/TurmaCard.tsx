import TurmaCardProps from "@/types/classroom";

interface TurmaCardProps{
    turma: Turma;
 }
 
export function TurmaCard({
    turma,
}: TurmaCardProps) {
    return (
        <div className="rounded-2xl border p-5">
            <h2 className="text-lg font-semibold">
                {turma.nome}
            </h2>

            <p className="text-sm">
                {turma.serie}
            </p>

            <p className="mt-2 text-sm">
                {turma.alunos} alunos
            </p>
        </div>
    );
}