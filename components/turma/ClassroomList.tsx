import { Classroom } from "@/types/classroom";
import { ClassroomCard } from "./ClassroomCard";

interface ClassroomListProps {
    classrooms: Classroom[];
}

export default function ClassroomList({classrooms,}: ClassroomListProps) {

    return (
        <div className="grid gap-4 md:grid-cols-2">
            {classrooms.map((classroom) => (

                <ClassroomCard
                    key={classroom.id}
                    turma={classroom}
                />
            ))}
        </div>
    );
}