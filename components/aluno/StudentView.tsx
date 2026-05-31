import { Student } from "@/types/student";
import { getClassroomById, getClassroomDisplayName } from "@/services/classroom.service";

import View from "@/components/ui/View";
import { Button } from "../ui/Button";

import { serverClient } from "@/lib/supabase/server";

interface Props {
    student: Student;
};

const supabase = await serverClient();

export default async function StudentView({ student }: Props) {

    if (!student.classroomId) {
        return null;
    }

    const classroom = await getClassroomById(supabase, student.classroomId);

    if (!classroom) {
        return null;
    }

    const classroomName = await getClassroomDisplayName(classroom);

    return (
        <View>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-foreground">
                    {student.name}
                </h1>

                <p className="mt-2 text-secondary">
                    {student.enrollment}
                </p>
            </div>

            <div className="space-y-4 text-sm text-foreground">
                <div>
                    <span className="text-secondary">Turma:</span>
                    {" "}{classroomName}
                </div>

                <div>
                    {student.content && (
                        <p className="mt-3 text-sm">
                            {student.content}
                        </p>
                    )}
                </div>
            </div>

            <div className="mt-8">
                <Button href="?mode=edit">Editar</Button>
            </div>
        </View>
    );
}