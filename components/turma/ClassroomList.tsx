import { Classroom } from "@/types/classroom";
import { ClassroomCard } from "./ClassroomCard";
import List from "@/components/ui/List";

interface Props {
    classroom: Classroom[];
}

export default function ClassroomList({ classroom }: Props) {

    return (
        <List>
            {classroom.map((classroom) => (
                <ClassroomCard
                    key={classroom.id}
                    classroom={classroom}
                />
            ))}
        </List>
    );
}