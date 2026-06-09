import Link from "next/link";

import { LessonPlan } from "@/types/lessonPlan";
import { getClassroomById, getClassroomDisplayName, } from "@/services/classroom.service";

import Card from "../ui/Card";
import Badge from "@/components/ui/Badge";

import { formatDateTime } from "@/lib/format/formatDate";
import { serverClient } from "@/lib/supabase/server";

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
    <Link href={`/planos/${plan.id}`}>

      <Card>

        <div className="flex items-center justify-between gap-4">

          <div className="min-w-0 flex-1">

            <h2 className="truncate text-lg font-medium text-foreground">
              {plan.title || "Sem título"}
            </h2>

            <p className="truncate text-sm text-foreground">{classroomName}</p>

          </div>

          <span className="whitespace-nowrap text-sm text-text-primary">
            {formatDateTime(plan.createdAt)}
          </span>

        </div>

        {plan.description && (
          <p className="mt-3 text-sm text-text-primary">{plan.description}</p>
        )}

        <div className="mt-3 flex flex-wrap gap-2">

          {plan.subjects.map((subject) => (
            <Badge key={subject} variant="primary">
              {subject}
            </Badge>
          ))}

        </div>

      </Card>
    </Link>
  );
}
