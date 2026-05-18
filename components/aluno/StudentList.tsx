import { Student } from "@/types/student";
import StudentCard from "./StudentCard";
import List from "@/components/ui/List";

interface Props {
    students: Student[];
}

export default function StudentList({ students }: Props) {
    return (
        <List>
            {students.map((student) => (
                <StudentCard
                    key={student.id}
                    student={student}
                />
            ))}
        </List>
    );
}