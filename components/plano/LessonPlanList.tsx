import { LessonPlan } from "@/types/lessonPlan";
import LessonPlanCard from "./LessonPlanCard";
import List from "@/components/ui/List";

interface Props {
    plan: LessonPlan[];
}

export default function LessonPlanList({ plan }: Props) {

    return (
        <List>
            {plan.map((plan) => (
                <LessonPlanCard
                    key={plan.id}
                    plan={plan}
                />
            ))}
        </List>
    );
}