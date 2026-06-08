import Link from "next/link";

import { LessonPlan } from "@/types/lessonPlan";
import { getClassroomById, getClassroomDisplayName } from "@/services/classroom.service";

import { formatDateTime } from "@/lib/format/formatDate";
import { serverClient } from "@/lib/supabase/server";

import Badge from "@/components/ui/Badge";

interface LessonPlanCardProps {
    plan: LessonPlan;
}

export default async function LessonPlanCard({ plan }: LessonPlanCardProps) {

    if (!plan.classroomId) {
        return null;
    }

    const supabase = await serverClient();
    const classroom = await getClassroomById(supabase, plan.classroomId);

    if (!classroom) {
        return null;
    }

    const classroomName = await getClassroomDisplayName(classroom);

    return (
        <Link
            href={`/planos/${plan.id}`}
            className="rounded-xl border border-border bg-surface p-5 transition hover:bg-muted"
        >

            <div className="flex items-start justify-between gap-4">

                <h2 className="text-xl font-semibold text-foreground">
                    {plan.title || "Sem título"}
                </h2>

                <span className="text-xs text-text-primary whitespace-nowrap">
                    {formatDateTime(plan.createdAt)}
                </span>

            </div>

            <p className="mt-3 text-sm text-secondary">
                {classroomName}
            </p>

            <p className="mt-2 text-sm text-text-primary">
                {plan.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">

                {plan.subjects.map((subject) => (
                    <Badge key={subject} variant="primary">
                        {subject}
                    </Badge>
                ))}

            </div>

        </Link>
    );
}