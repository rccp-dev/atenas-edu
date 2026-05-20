import { LessonPlan } from "@/types/lessonPlan";
import LessonPlanCard from "./LessonPlanCard";
import List from "@/components/ui/List";

interface Props {
    plans: LessonPlan[];
}

export default function LessonPlanList({ plans }: Props) {

    return (
        <List>
            {plans.map((plan) => (
                <LessonPlanCard key={plan.id} plan={plan}/>
            ))}
        </List>
    );
}