import { LessonPlan } from "@/types/lessonPlan";
import { getClassroomById, getClassroomDisplayName } from "@/services/classroom.service";

import View from "@/components/ui/View";
import { Button } from "../ui/Button";

import { serverClient } from "@/lib/supabase/server";

interface Props {
    plan: LessonPlan;
};

const supabase = await serverClient();

export default async function LessonPlanView({ plan }: Props) {

    if (!plan.classroomId) {
        return null;
    }

    const classroom = await getClassroomById(supabase, plan.classroomId);

    if (!classroom) {
        return null;
    }

    const classroomName = await getClassroomDisplayName(classroom);

    return (
        <View>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-foreground">
                    {plan.title}
                </h1>

                <p className="mt-2 text-secondary">
                    {plan.description}
                </p>
            </div>

            <div className="space-y-4 text-sm text-foreground">

                <div>
                    <span className="text-secondary">
                        Turma:
                    </span>

                    {" "}{classroomName}
                </div>

                <div>
                    <span className="text-secondary">
                        Matérias:
                    </span>

                    {" "}{plan.subjects?.join(", ")}
                </div>

                <div>
                    <span className="text-secondary">
                        Conteúdo:
                    </span>

                    <p className="mt-1 whitespace-pre-line">
                        {plan.content}
                    </p>
                </div>

            </div>

            <div className="mt-8">
                <Button href="?mode=edit">
                    Editar
                </Button>
            </div>

        </View>
    );
}