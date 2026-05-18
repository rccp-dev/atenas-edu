import { Activity } from "@/types/activity";
import { getActivityStatus } from "@/services/activity.service";

import { getClassroomById } from "@/services/classroom.service";

import View from "@/components/ui/View";
import { Button } from "@/components/ui/Button";

interface Props {
    activity: Activity;
};

export default async function ActivityView({ activity }: Props) {

    if (!activity.classroomId) {
        return null;
    }

    const classroom = await getClassroomById(
        activity.classroomId
    );

    return (
        <View>
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-foreground">
                    {activity.title}
                </h1>

                <p className="mt-2 text-secondary">
                    {activity.description}
                </p>
            </div>

            <div className="space-y-4 text-sm text-foreground">

                <div>
                    <span className="text-secondary">Turma:</span>
                    {" "}{classroom?.name}
                </div>

                <div>
                    <span className="text-secondary">Prazo:</span>
                    {" "}{activity.deadline}
                </div>

                <div>
                    <span className="text-secondary">Status:</span>
                    {" "}{getActivityStatus(activity)}
                </div>

                <div>
                    <span className="text-secondary">Link público:</span>
                    {" "}
                    {activity.public_token
                        ? `atividade/${activity.public_token}`
                        : "Sem link disponível"}
                </div>

                <div>
                    <span className="text-secondary">Anexos:</span>

                    <div className="mt-4 flex gap-2 flex-wrap">
                        {activity.attachments?.map((link) => (
                            <a 
                                key={link} href={link} target="_blank" 
                                rel="noopener noreferrer"
                                className="rounded-md bg-secondary px-2 py-1 text-sm text-light" 
                           >
                                {link}
                            </a>
                        ))}
                    </div>
                </div>

            </div>

            <div className="mt-8">
                <Button href="?mode=edit">Editar</Button>
            </div>
        </View>
    );
}