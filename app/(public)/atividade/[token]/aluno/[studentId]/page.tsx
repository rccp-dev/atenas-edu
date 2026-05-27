import { notFound } from "next/navigation";

import { getActivityByToken } from "@/queries/activity.queries";
import { getSubmissionByActivityAndStudent } from "@/queries/submission.queries";
import { getStudentById } from "@/services/student.service";
import { getClassroomById } from "@/services/classroom.service";

import SubmissionPublicForm from "@/components/public/SubmissionPublicForm";
import SubmissionPublicEdit from "@/components/public/SubmissionPublicEdit";
import SubmissionPublicView from "@/components/public/SubmissionPublicView";

export const dynamic = "force-dynamic";

interface Props {
    params: Promise<{
        token: string;
        studentId: string;
    }>;
}

export default async function SubmissionPublicPage({ params }: Props) {

    const { token, studentId } = await params;

    const activity = await getActivityByToken(token);
    const student = await getStudentById(studentId);

    if (!activity || !student) {
        notFound();
    }

    const submission = await getSubmissionByActivityAndStudent(activity.id, studentId);
    const classroom = await getClassroomById(student.classroomId);

    if (!classroom) {
        return notFound();
    }
    
    if (!submission || !classroom) {

        return (
            <main className="flex justify-center items-center min-h-screen px-4 py-10">
                <section className="w-full max-w-4xl rounded-2xl border border-border bg-surface p-8 shadow-sm">
                        <SubmissionPublicForm activity={activity} student={student} classroom={classroom}/>
                </section>
            </main>
        );
    }

    if (submission.isDraft) {

        return (
            <SubmissionPublicEdit submission={submission}/>
        );
    }

    return (
        <SubmissionPublicView submission={submission}/>
    );
}