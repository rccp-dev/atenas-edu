import { Classroom } from "@/types/classroom";
import { Button } from "@/components/ui/Button";

type Props = {
    turma: Classroom;
    students: any[];
};

export default function ClassroomEdit({ turma }: Props) {

  return (
    <main className="flex justify-center items-center min-h-screen px-4 py-10">
        <section className="w-full max-w-3xl rounded-2xl border border-border bg-surface p-8 shadow-sm">
            <div className="mb-6">
                <h1 className="text-3xl font-bold">
                    Editar turma
                </h1>

                <p className="mt-2 text-secondary">
                    {turma.nome}
                </p>
            </div>

            <div className="flex flex-col gap-4">
                <span className="text-xl text-secondary">Ano:</span>
                <input defaultValue={turma.ano} className="rounded-xl border border-border bg-light p-4 outline-none"/>

                <span className="text-xl text-secondary">Série:</span>
                <input defaultValue={turma.identificador} className="rounded-xl border border-border bg-light p-4 outline-none"/>

                <span className="text-xl text-secondary">Descrição:</span>
                <textarea defaultValue={turma.descricao} className="rounded-xl border border-border bg-light p-4 outline-none"/>
            </div>

            <div className="mt-8 flex gap-3">
                <Button href="?mode=view">Voltar</Button>
                <Button>Salvar alterações</Button>
            </div>

        </section>
    </main>
  );
}