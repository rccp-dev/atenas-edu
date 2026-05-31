import { notFound } from "next/navigation";
import { getActivityByToken } from "@/queries/activity.query";
import { getClassroomById, getClassroomDisplayName } from "@/services/classroom.service";
import SubmissionAccess from "@/components/public/SubmissionAccess";

import { serverClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

interface Props {
    params: Promise<{
        token: string;
    }>;
}

export default async function StudentLoginPage({ params }: Props) {

    const { token } = await params;
    const supabase = await serverClient();
    const activity = await getActivityByToken(supabase, token);

    if (!activity) {
        notFound();
    }

    const classroom =
        activity.classroomId
            ? await getClassroomById(supabase, activity.classroomId)
            : null;

    if (!classroom) {
        return null;
    }

    const classroomName = await getClassroomDisplayName(classroom);

    return (
        <SubmissionAccess activity={activity} classroomName={classroomName}/>
    );
}