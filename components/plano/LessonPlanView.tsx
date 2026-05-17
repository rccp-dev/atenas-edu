import { LessonPlan } from "@/types/lessonPlan";
import { getClassroomById } from "@/services/classroom.service";
import { Button } from "@/components/ui/Button";


type Props = {
    plan: LessonPlan;
};

export default async function LessonPlanView({ plan }: Props) {

    if (!plan.classroomId) {
        return null;
    }

    const classroom = await getClassroomById(plan.classroomId);

    return (
        <main className="flex justify-center items-center min-h-screen px-4 py-10">
            <section className="w-full max-w-4xl rounded-2xl border border-border bg-surface p-8 shadow-sm">

                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-foreground">{plan.title}</h1>
                    <p className="mt-2 text-secondary">{plan.description}</p>
                </div>

                <div className="space-y-4 text-sm text-foreground">
                    <div>
                        <span className="text-secondary">Turma:</span>
                        {" "}{classroom?.nome}
                    </div>

                    <div>
                        <span className="text-secondary">Matérias:</span>
                        {" "}{plan.subjects?.join(", ")}
                    </div>

                    <div>
                        <span className="text-secondary">Conteúdo:</span>
                        <p className="mt-1 whitespace-pre-line">{plan.content}</p>
                    </div>
                </div>

                <div className="mt-8">
                    <Button href="?mode=edit">Editar</Button>
                </div>

            </section>
        </main>
    );
}