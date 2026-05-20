import { Classroom } from "@/types/classroom";
import { Student } from "@/types/student";

import View from "@/components/ui/View";
import { Button } from "../ui/Button";

interface Props {
    classroom: Classroom;
    students: Student[];
};

export default function ClassroomView({ classroom, students }: Props) {

    return (
        <View>
            <div className="space-y-2">
                <div className="flex justify-between itemsc-center">
                    <h1 className="text-4xl font-bold">
                        {classroom.name}
                    </h1>

                    <Button href="?mode=edit">Editar</Button>
                </div>

                <p className="mt-2 text-secondary">
                    {classroom.description}
                </p>
            </div>

            <section className="space-y-4">
                <h2 className="text-xl font-semibold">
                    Alunos
                </h2>

                <div className="space-y-3">
                    {students.filter(
                                (student) => student.classroomId === classroom.id
                            ).map((student) => (


                        <div key={student.id} className="rounded-2xl border border-border p-4">

                            <h3 className="font-medium">
                                {student.name}
                            </h3>

                            <p className="text-sm text-muted-foreground">
                                Matrícula: {student.enrollment}
                            </p>

                            {student.content && (
                                <p className="mt-3 text-sm">
                                    {student.content}
                                </p>
                            )}

                        </div>
                    ))}
                </div>
            </section>
        </View>
    );
}