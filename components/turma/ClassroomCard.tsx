import { Classroom } from "@/types/classroom";
import { getClassroomDisplayName } from "@/services/classroom.service";
import Link from "next/link";

interface ClassroomCardProps {
    classroom: Classroom;
}

export async function ClassroomCard({ classroom }: ClassroomCardProps) {

    const classroomName = getClassroomDisplayName(classroom);

    return (
        <Link href={`/turmas/${classroom.id}`} className="rounded-2xl border border-border bg-surface p-5 transition hover:bg-muted">

            <h2 className="text-lg font-semibold text-foreground">
                {classroomName}
            </h2>

            <p className="mt-3 text-sm text-text-primary">
                {classroom.description}
            </p>

        </Link>
    );
}
