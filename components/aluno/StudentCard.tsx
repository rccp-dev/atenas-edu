import Link from "next/link";

import { Student } from "@/types/student";
import { getClassroomById, getClassroomDisplayName, } from "@/services/classroom.service";

import Card from "../ui/Card";

import { serverClient } from "@/lib/supabase/server";

interface StudentCardProps {
  student: Student;
}

export default async function StudentCard({ student }: StudentCardProps) {
  if (!student.classroomId) {
    return null;
  }

  const supabase = await serverClient();
  const classroom = await getClassroomById(supabase, student.classroomId);

  if (!classroom) {
    return null;
  }

  const classroomName = await getClassroomDisplayName(classroom);

  return (
    <Link href={`/alunos/${student.id}`}>

      <Card>

          <div className="flex items-center justify-between gap-4">

              <div className="min-w-0 flex-1">

                  <h2 className="truncate text-lg font-medium text-foreground">
                      {student.name || "Sem nome"}
                  </h2>

                  <p className="truncate text-sm text-foreground">
                      {classroomName}
                  </p>

              </div>

              <span className="whitespace-nowrap text-sm text-text-primary">
                  {student.enrollment || "Sem matrícula"}
              </span>

          </div>

      </Card>
    </Link>
  );
}