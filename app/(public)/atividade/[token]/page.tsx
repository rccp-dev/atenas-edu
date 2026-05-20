import { notFound } from "next/navigation";
import { getActivityByToken } from "@/services/activity.service";
import { getClassroomById } from "@/services/classroom.service";
import SubmissionAccess from "@/components/public/SubmissionAccess";

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

    return (
        <SubmissionAccess activity={activity} classroom={classroom}/>
    );
}