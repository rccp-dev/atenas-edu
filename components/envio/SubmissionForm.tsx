'use client';

import { useEffect, useState } from "react";

import { Submission } from "@/types/submission";
import { Student } from "@/types/student";
import { Classroom } from "@/types/classroom";

import { createSubmission } from "@/services/submission.service";
import { getClassrooms } from "@/services/classroom.service";
import { getStudents } from "@/services/student.service";

import Form from "@/components/ui/Form";
import Field from "@/components/ui/Field";
import Select from "@/components/ui/Select";
import UploadBox from "@/components/envio/UploadBox";
import { Button } from "@/components/ui/Button";

interface Props {
    submission?: Submission;
}

export default function SubmissionForm({ submission }: Props) {

    const [studentId, setStudentId] = useState(
        submission?.studentId || ""
    );

    const [students, setStudents] = useState<
        Student[]
    >([]);

    const [classroomId, setClassroomId] = useState(
        submission?.classroomId || ""
    );

    const [classrooms, setClassrooms] = useState<
        Classroom[]
    >([]);

    useEffect(() => {

        async function loadStudents() {
            const data = await getStudents();
            setStudents(data);
        }

        async function loadClassrooms() {
            const data = await getClassrooms();
            setClassrooms(data);
        }

        loadStudents();
        loadClassrooms();
        
    }, []);

    async function handleSubmit() {

        await createSubmission({
            studentId,
            classroomId,
            // file_url,
            status: ["Entregue"],
            submittedAt: new Date().toISOString(),
            isDraft: false
        });

    }

    return (
        <Form>
            <div className="flex flex-col gap-4 w-sm">

                <Field label="Nome do aluno">
                    <Select value={studentId} onChange={(e) => setStudentId(e.target.value)}>

                        <option value="">Selecione seu nome</option>

                        {students.map((student) => (
                            <option key={student.id} value={student.id}>
                                {student.name}
                            </option>
                        ))}

                    </Select>                
                </Field>

                <Field label="Turma">
                    <Select value={classroomId} onChange={(e) => setClassroomId(e.target.value)}>

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