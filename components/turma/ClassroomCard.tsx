import { Classroom } from "@/types/classroom";
import { getClassroomDisplayName } from "@/services/classroom.service";
import Link from "next/link";

interface ClassroomCardProps{
    classroom: Classroom;
 }
 
export async function ClassroomCard({classroom}: ClassroomCardProps) {

    const classroom_name = getClassroomDisplayName(classroom);

    return (
        <Link href={`/turmas/${classroom.id}`} className="rounded-2xl border border-border bg-background p-5 transition hover:bg-white">
            <h2 className="text-lg font-semibold">
                {classroom_name}
            </h2>

            <p className="mt-3 text-secondary">{classroom.description}</p>
        </Link>
    );
}