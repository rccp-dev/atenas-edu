import { Classroom } from "@/types/classroom";
import Link from "next/link";

interface ClassroomCardProps{
    turma: Classroom;
 }
 
export function ClassroomCard({turma}: ClassroomCardProps) {
    return (
        <Link href={`/turmas/${turma.id}`} className="rounded-2xl border border-border bg-background p-5 transition hover:bg-white">
            <h2 className="text-lg font-semibold">
                {turma.nome}
            </h2>

            {turma.descricao && (
                <p className="mt-2 text-sm">
                    {turma.descricao}
                </p>
            )}
        </Link>
    );
}