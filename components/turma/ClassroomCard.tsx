import Link from "next/link";

import { Classroom } from "@/types/classroom";
import { getClassroomDisplayName } from "@/services/classroom.service";

import Card from "../ui/Card";

interface ClassroomCardProps {
  classroom: Classroom;
}

export async function ClassroomCard({ classroom }: ClassroomCardProps) {

  const classroomName = getClassroomDisplayName(classroom);

  return (
    <Link href={`/turmas/${classroom.id}`}>

      <Card>

          <div className="flex items-center justify-between gap-4">

              <div className="min-w-0 flex-1">

                  <h2 className="truncate text-lg font-medium text-foreground">
                      {classroomName}
                  </h2>

                  <p className="truncate text-sm text-foreground">
                      {classroom.description}
                  </p>

              </div>

          </div>

      </Card>
    </Link>
  );
}
