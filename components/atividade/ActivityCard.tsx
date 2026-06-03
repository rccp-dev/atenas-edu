import Link from "next/link";

import { Activity } from "@/types/activity";
import { getActivityStatus } from "@/services/activity.service";
import { getClassroomById, getClassroomDisplayName } from "@/services/classroom.service";

import Card from "@/components/ui/Card";
import Status from "@/components/ui/Status";

import { formatDate, formatDateTime } from "@/lib/format/formatDate";

import { serverClient } from "@/lib/supabase/server";


interface ActivityCardProps {
    activity: Activity;
}

export default async function ActivityCard({ activity }: ActivityCardProps) {

    if (!activity.classroomId) {
        return null;
    }

    const supabase = await serverClient();
    const classroom = await getClassroomById(supabase, activity.classroomId);
    const status = getActivityStatus(activity);

    if (!classroom) {
        return null;
    }

    const classroomName = await getClassroomDisplayName(classroom);

    return (
        <Link href={`/atividades/${activity.id}`}>
            <Card>
                <div className="flex items-center justify-between">

                    <h2 className="text-xl font-semibold">
                        {activity.title || "Sem título"}
                    </h2>

                    <span className="text-sm text-secondary">
                        {formatDateTime(activity.createdAt)}
                    </span>

                </div>

                <div>
                    <div className="flex gap-2 my-2 py-1 px-4">
                        <Status status={status} />
                    </div>

                    <p className="text-secondary">
                        {classroomName}
                    </p>

                    <div>
                        <span className="text-secondary">Prazo:</span>
                        {" "}{formatDate(activity.deadline) || "Sem prazo definido"}
                    </div>

                    <div>
                        <span className="text-secondary">Link de entrega:</span>
                        {" "}
                        {activity.token ? (
                            `atividade/${activity.token}`
                        ) : (
                            "Sem link de entrega"
                        )}
                    </div>
                </div>
            </Card>
        </Link>
    );
}