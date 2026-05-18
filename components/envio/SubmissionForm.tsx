'use client';

import { useEffect, useState } from "react";

import { Submission } from "@/types/submission";
import { Student } from "@/types/student";
import { Classroom } from "@/types/classroom";

import { createSubmission } from "@/services/submission.service";
import { getClassrooms } from "@/services/classroom.service";

import Form from "@/components/ui/Form";
import Field from "@/components/ui/Field";
import Select from "@/components/ui/Select";
import UploadBox from "@/components/envio/UploadBox";
import { Button } from "@/components/ui/Button";

interface Props {
    initialData?: Submission;
}

export default function SubmissionForm({ initialData }: Props) {

    const [student_name, setStudentName] = useState(
        initialData?.student_name || ""
    );

    const [students, setStudents] = useState<
        Student[]
    >([]);

    const [classroom, setClassroom] = useState(
        initialData?.classroomId || ""
    );

    const [classrooms, setClassrooms] = useState<
        Classroom[]
    >([]);

    useEffect(() => {

        async function loadRelatedItems() {
            const data = await getClassrooms();
            setClassrooms(data);
        }

        loadRelatedItems();

    }, []);

    async function handleSubmit() {

        await createSubmission({
            student_name,
            classroom,
            file_url,
            status,
        });

    }

    return (
        <Form>
            <div className="flex flex-col gap-4 w-sm">

                <Field label="Nome do aluno">
                    <Select value={student_name} onChange={(e) => setStudentName(e.target.value)}>

                        <option value="">Selecione seu nome</option>

                        {students.map((student) => (
                            <option key={student.id} value={student.id}>
                                {student.name}
                            </option>
                        ))}

                    </Select>                
                </Field>

                <Field label="Turma">
                    <Select value={classroom} onChange={(e) => setClassroom(e.target.value)}>

                        <option value="">Selecione sua turma</option>

                        {classrooms.map((classroom) => (
                            <option key={classroom.id} value={classroom.id}>
                                {classroom.name}
                            </option>
                        ))}

                    </Select>
                </Field>

            </div>

            <UploadBox />

            <div className="w-20">
                <Button type="submit" onClick={handleSubmit}>Enviar</Button>
            </div>
        </Form>
    );
}