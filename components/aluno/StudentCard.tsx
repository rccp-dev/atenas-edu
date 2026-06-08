import { Student } from "@/types/student";
import { getClassroomById, getClassroomDisplayName } from "@/services/classroom.service";

import Link from "next/link";
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
        <Link
            href={`/alunos/${student.id}`}
            className="rounded-xl border border-border bg-surface p-4 transition hover:bg-muted"
        >

            <div className="flex items-center gap-4">

                <div className="min-w-0 flex-1">

                    <h3 className="truncate text-base font-medium text-foreground">
                        {student.name || "Sem nome"}
                    </h3>

                    <p className="text-sm text-secondary truncate">
                        {classroomName}
                    </p>

                </div>

                <span className="text-sm text-text-primary whitespace-nowrap">
                    {student.enrollment || "Sem matrícula"}
                </span>

            </div>
        </Link>
    );
}
