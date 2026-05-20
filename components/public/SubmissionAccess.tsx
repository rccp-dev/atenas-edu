'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Activity } from "@/types/activity";
import { Student } from "@/types/student";
import { Classroom } from "@/types/classroom"

import { getStudents } from "@/services/student.service";

import Form from "@/components/ui/Form";
import Field from "@/components/ui/Field";
import Select from "@/components/ui/Select";
import { Button } from "../ui/Button";

interface Props {
    activity: Activity;
    classroom?: Classroom | null;
}

export default function SubmissionAccess({ activity, classroom }: Props) {

    const router = useRouter();
    const [studentId, setStudentId] = useState("");
    const [students, setStudents] = useState<Student[]>([])

    useEffect(() => {

        async function loadStudents() {
            const students = await getStudents();
            const filtered_students = students.filter((student) => student.classroomId === activity.classroomId);
            setStudents(filtered_students);
        }

        loadStudents();

    }, [activity.classroomId]);

    function handleAccess() {

        if (!studentId) {
            return;
        }

        router.push(`/atividade/${activity.token}/aluno/${studentId}`);
    }

    return (
        <main className="flex justify-center items-center min-h-screen px-4 py-10">
            <section className="w-full max-w-2xl rounded-2xl border border-border bg-surface p-8 shadow-sm">

                <Form>
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold">
                                {activity.title}
                            </h1>

                            <p className="mt-2 text-secondary">
                                {classroom?.name}
                            </p>
                        </div>

                        <Field label="Seu nome">

                            <Select value={studentId} onChange={(e) => setStudentId(e.target.value)}>

                                <option value="">Selecione seu nome</option>

                                {students.map((student) => (
                                    <option key={student.id} value={student.id}>
                                        {student.name}
                                    </option>
                                ))}

                            </Select>

                        </Field>

                        <div className="w-24">
                            <Button onClick={handleAccess}>Entrar</Button>
                        </div>
                    </div>
                </Form>

            </section>
        </main>

    );
}