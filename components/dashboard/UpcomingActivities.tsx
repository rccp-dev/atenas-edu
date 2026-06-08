import Link from "next/link";

import { ClipboardList } from "lucide-react";

import Card from "@/components/ui/Card";

import { ROUTES } from "@/constants/routes";
import { formatDate } from "@/lib/format/formatDate";

interface Activity {
    id: string;
    title: string;
    deadline: string;
    classroomName: string;
}

interface Props {
    activities: Activity[];
}

export default function UpcomingActivities({
    activities,
}: Props) {

    return (
        <Card>

            <h2 className="text-2xl font-semibold text-primary">
                Próximas atividades
            </h2>

            <div className="mt-6 space-y-4">

                {activities.length === 0 && (

                    <p className="text-secondary">
                        Nenhuma atividade pendente.
                    </p>

                )}

                {activities.map((activity) => (

                    <Link key={activity.id} href={`${ROUTES.ACTIVITIES}/${activity.id}`}>

                        <Card className="bg-background">

                            <div className="flex items-center gap-4">

                                <div className="rounded-xl bg-surface p-3">

                                    <ClipboardList
                                        size={18}
                                        strokeWidth={1.8}
                                        className="text-primary"
                                    />

                                </div>

                                <div className="min-w-0 flex-1">

                                    <h3 className="truncate text-lg font-medium text-foreground">
                                        {activity.title}
                                    </h3>

                                    <p className="text-secondary">
                                        {activity.classroomName}
                                    </p>

                                </div>

                                <span className="text-sm text-secondary">
                                    {formatDate(activity.deadline)}
                                </span>

                            </div>
                        </Card>
                    </Link>
                ))}
            </div>
        </Card>
    );
}