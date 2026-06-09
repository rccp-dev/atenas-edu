import { notFound } from "next/navigation";
import Link from "next/link";

import { Submission } from "@/types/submission";
import { getStudentById } from "@/services/student.service";
import { getActivityById } from "@/services/activity.service";
import { getClassroomById, getClassroomDisplayName, } from "@/services/classroom.service";

import Card from "@/components/ui/Card";
import Status from "../ui/Status";

import { formatDate } from "@/lib/format/formatDate";

import { serverClient } from "@/lib/supabase/server";

interface Props {
  submission: Submission;
}

export default async function SubmissionCard({ submission }: Props) {

  if (!submission.studentId || !submission.activityId || !submission.classroomId) {
    return null;
  }

  const supabase = await serverClient();

  const student = await getStudentById(supabase, submission.studentId);
  const classroom = await getClassroomById(supabase, submission.classroomId);
  const activity = await getActivityById(supabase, submission.activityId);

  if (!classroom) {
    notFound();
  }

  const classroomName = await getClassroomDisplayName(classroom);

  return (
    <Link href={`/envios/${submission.id}`}>

      <Card>

        <div className="flex items-center justify-between gap-4">

          <div className="min-w-0 flex-1">

            <h2 className="truncate text-lg font-medium text-foreground">
              {student?.name || "Sem nome do aluno"}
            </h2>

            <p className="truncate text-sm text-foreground">
              {activity?.title || "Sem título da atividade"}
            </p>

          </div>

          <span className="whitespace-nowrap text-sm text-text-primary">
            {formatDate(submission.submittedAt)}
          </span>

        </div>

        <div className="mt-3 flex items-center gap-3">

          <Status status={submission.status} />

          <span className="text-sm text-text-primary">{classroomName}</span>

        </div>

      </Card>
    </Link>
  );
}
