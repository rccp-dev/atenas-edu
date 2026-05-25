import { Student } from "@/types/student";
import { getClassroomById } from "@/services/classroom.service";
import { getClassroomDisplayName } from "@/services/classroom.service";

import Link from "next/link";
import Card from "@/components/ui/Card";
import { notFound } from "next/navigation";

interface StudentCardProps {
    student: Student;
}

export default async function StudentCard({ student }: StudentCardProps) {

    if (!student.classroomId) {
        return notFound();
    }

    const classroom = await getClassroomById(student.classroomId);

   
    if (!classroom) {
        return notFound();
    }

    const classroom_name = await getClassroomDisplayName(classroom);

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

                <p className="mt-3 text-secondary">{classroom_name}</p>
            </Card>
        </Link>
    );
}