import { notFound } from "next/navigation";
import { getActivityByToken } from "@/queries/activity.query";
import { getClassroomById, getClassroomDisplayName } from "@/services/classroom.service";
import SubmissionAccess from "@/components/public/SubmissionAccess";

export const dynamic = "force-dynamic";

interface Props {
    params: Promise<{
        token: string;
    }>;
}

export default async function StudentLoginPage({ params }: Props) {

    const { token } = await params;
    const activity = await getActivityByToken(token);

    if (!activity) {
        notFound();
    }

    const classroom =
        activity.classroomId
            ? await getClassroomById(
                activity.classroomId
            )
            : null;

    if (!classroom) {
        return null;
    }

    const classroomName = await getClassroomDisplayName(classroom);

    return (
        <SubmissionAccess activity={activity} classroomName={classroomName}/>
    );
}