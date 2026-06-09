import Link from "next/link";

import { Activity } from "@/types/activity";
import { getActivityStatus } from "@/services/activity.service";
import { getClassroomById, getClassroomDisplayName, } from "@/services/classroom.service";

import Card from "@/components/ui/Card";
import Status from "@/components/ui/Status";

import { formatDate, formatDateTime } from "@/lib/format/formatDate";

import { serverClient } from "@/lib/supabase/server";

interface ActivityCardProps {
  activity: Activity;
}

export default async function ActivityCard({ activity }: ActivityCardProps) {

  if (!activity.classroomId) {
    return null;
  }

  const supabase = await serverClient();
  const classroom = await getClassroomById(supabase, activity.classroomId);
  const status = getActivityStatus(activity, "teacher");

  if (!classroom) {
    return null;
  }

  const classroomName = await getClassroomDisplayName(classroom);

  return (
    <Link href={`/atividades/${activity.id}`}>

      <Card>

          <div className="flex items-center justify-between gap-4">

              <div className="min-w-0 flex-1">

                  <h2 className="truncate text-lg font-medium text-foreground">
                      {activity.title || "Sem título"}
                  </h2>

                  <p className="truncate text-sm text-foreground">
                      {classroomName}
                  </p>

              </div>

              <Status status={status} />

          </div>

          <div className="mt-3 flex items-center justify-between gap-4">

              <span className="text-sm text-text-primary">
                  Prazo: {formatDate(activity.deadline) || "Sem prazo definido"}
              </span>

              <span className="whitespace-nowrap text-sm text-text-primary">
                  {formatDateTime(activity.createdAt)}
              </span>

          </div>

      </Card>
    </Link>
  );
}
