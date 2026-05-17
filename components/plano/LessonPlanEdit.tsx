import { LessonPlan } from "@/types/lessonPlan";
import { getClassrooms } from "@/services/classroom.service";
import { getClassroomById } from "@/services/classroom.service";
import { subject_options } from "@/types/lessonPlan";
import { Button } from "@/components/ui/Button";

type Props = {
    plan: LessonPlan;
};

export default async function LessonPlanEdit({ plan }: Props) {

    if (!plan.classroomId) {
        return null;
    }

    const classrooms = await getClassrooms();
    const classroom = await getClassroomById(plan.classroomId);

    return (
        <main className="flex justify-center items-center min-h-screen px-4 py-10">
            <section className="w-full max-w-4xl rounded-2xl border border-border bg-surface p-8 shadow-sm">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-foreground">
                        Editar plano de aula
                    </h1>

                    <p className="mt-2 text-secondary">{classroom?.nome}</p>
                </div>

                <div className="flex flex-col gap-4">
                    <input defaultValue={plan.title} className="text-lg rounded-xl border border-border bg-light p-4 outline-none"/>

                    <span className="text-xl text-secondary">Matérias:</span>
                    <select multiple defaultValue={plan.subjects} className="rounded-xl border border-border bg-light p-4 outline-none">
                        {subject_options.map((s) => (
                            <option key={s} value={s}>
                                {s}
                            </option>
                        ))}
                    </select>
                        
                    <span className="text-xl text-secondary">Turma:</span>
                    <select defaultValue={plan.classroomId} className="rounded-xl border border-border bg-light p-4 outline-none">
                        <option value="">Selecione uma turma</option>

                        {classrooms.map((classroom) => (
                            <option key={classroom.id} value={classroom.id}>
                                {classroom.nome}
                            </option>
                        ))}
                    </select>

                    <span className="text-xl text-secondary">Descrição:</span>
                    <textarea defaultValue={plan.description} className="rounded-xl border border-border bg-light p-4 outline-none"/>

                    <span className="text-xl text-secondary">Conteúdo:</span>
                    <textarea defaultValue={plan.content} className="min-h-50 rounded-xl border border-border bg-light p-4 outline-none"/>
                </div>

                <div className="mt-8 flex gap-3">
                    <Button href="?mode=view">Voltar</Button>
                    <Button>Salvar alterações</Button>
                </div>
            </section>
        </main>
    );
}
