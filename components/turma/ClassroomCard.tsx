import { Classroom } from "@/types/classroom";
import { getClassroomDisplayName } from "@/services/classroom.service";
import Link from "next/link";

interface ClassroomCardProps {
    classroom: Classroom;
}

export async function ClassroomCard({ classroom }: ClassroomCardProps) {

    const classroomName = getClassroomDisplayName(classroom);

    return (
        <Link
            href={`/turmas/${classroom.id}`}
            className="rounded-xl border border-border bg-surface p-4 transition hover:bg-muted"
        >

            <div className="flex items-center gap-4">

                <div className="min-w-0 flex-1">

                    <h3 className="truncate text-base font-medium text-foreground">
                        {classroomName}
                    </h3>

                    <p className="text-sm text-foreground truncate">
                        {classroom.description}
                    </p>

                </div>

            </div>

        </Link>
    );
}
