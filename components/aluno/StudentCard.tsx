import { Student } from "@/types/student";
import { getClassroomById } from "@/services/classroom.service";
import { getClassroomDisplayName } from "@/services/classroom.service";

import Link from "next/link";
import Card from "@/components/ui/Card";

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
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">
                        {student.name || "Sem nome"}
                    </h2>

                    <span className="text-sm text-secondary">
                        {student.enrollment || "Sem matrícula"}
                    </span>
                </div>

                <p className="mt-3 text-secondary">{classroomName}</p>
            </Card>
        </Link>
    );
}