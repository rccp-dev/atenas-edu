import { LessonPlan } from "@/types/lessonPlan";
import { getClassroomById } from "@/services/classroom.service";
import Link from "next/link";

interface LessonPlanCardProps {
    plan: LessonPlan;
}

export default async function LessonPlanCard({plan,}: LessonPlanCardProps) {

    if (!plan.classroomId) {
        return null;
    }

    const classroom = await getClassroomById(plan.classroomId);

    return (
        <Link href={`/planos/${plan.id}`} className="rounded-xl border border-border bg-background p-5 transition hover:bg-white">
            <div className="flex items-center justify-between">

                <h2 className="text-xl font-semibold">
                    {plan.title || "Sem título"}
                </h2>

                <span className="text-sm text-secondary">
                    {plan.createdAt}
                </span>
            </div>

            <p className="mt-3 text-secondary">{classroom?.nome}</p>

            <p className="mt-3 text-secondary">{plan.description}</p>

            <div className="mt-4 flex gap-2">
                {plan.subjects.map(
                    (subject) => (

                    <span key={subject} className="rounded-md bg-primary px-2 py-1 text-sm text-light">
                        {subject}
                    </span>
                ))}
            </div>
        </Link>
    );
}