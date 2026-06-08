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
            className="block rounded-xl border border-border bg-surface p-5 transition hover:bg-muted"
        >

            <div className="flex items-center justify-between">
                
                <h2 className="text-lg font-semibold text-foreground">
                    {student.name || "Sem nome"}
                </h2>

                <span className="text-xs text-text-primary">
                    {student.enrollment || "Sem matrícula"}
                </span>
                
            </div>

            <p className="mt-3 text-sm text-secondary">
                {classroomName}
            </p>
            
        </Link>
    );
}
