import Link from "next/link";

import { Submission } from "@/types/submission";
import { Student } from "@/types/student";

import Card from "@/components/ui/Card";

import { formatDate } from "@/lib/format/formatDate";

interface Props {
    submissions: Submission[];
    student_lookup: Record<string, Student>;
}

export default function ActivitySubmissionList({
    submissions,
    student_lookup
}: Props) {

    if (submissions.length === 0) {
        return null;
    }

    return (
        <div className="mt-6 space-y-4">

            <h1 className="text-xl text-secondary">
                Envios
            </h1>

            <div className="grid gap-4">

                {submissions.map((submission) => {

                    const student =
                        student_lookup[
                            submission.studentId
                        ];

                    return (
                        <Link
                            key={submission.id}
                            href={`/envios/${submission.id}`}
                        >

                            <Card>

                                <div className="flex items-center justify-between">

                                    <h2 className="text-lg font-semibold">
                                        {student?.name || "Aluno desconhecido"}
                                    </h2>

                                    <span className="text-sm text-secondary">
                                        {submission.status}
                                    </span>

                                </div>

                                <p className="mt-3 text-secondary">
                                    {formatDate(submission.submittedAt)}
                                </p>

                            </Card>

                        </Link>
                    );
                })}

            </div>

        </div>
    );
}