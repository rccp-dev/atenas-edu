import { Activity } from "@/types/activity";
import { getActivityStatus } from "@/services/activity.service";
import { getClassroomById } from "@/services/classroom.service";
import Link from "next/link";
import Card from "@/components/ui/Card";

interface ActivityCardProps {
    activity: Activity;
}

export default async function ActivityCard({ activity }: ActivityCardProps) {

    if (!activity.classroomId) {
        return null;
    }

    const classroom = await getClassroomById(activity.classroomId);
    const status = getActivityStatus(activity);

    return (
        <Link href={`/atividades/${activity.id}`}>
            <Card>
                <div className="flex items-center justify-between">

                    <h2 className="text-xl font-semibold">
                        {activity.title || "Sem título"}
                    </h2>

                    <span className="text-sm text-secondary">
                        {activity.createdAt}
                    </span>

                </div>

                <div>
                    {/* Desenvolver design token para status com badge em components/ e variação de cor por status */}
                    <div className="flex gap-2 my-2 py-1 px-4 font-semibold text-light text-sm bg-amber-500 max-w-max rounded-2xl">
                        {status}
                    </div>

                    <p className="text-secondary">
                        {classroom?.name}
                    </p>

                    <div>
                        <span className="text-secondary">Prazo:</span>
                        {" "}{activity.deadline || "Sem prazo definido"}
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