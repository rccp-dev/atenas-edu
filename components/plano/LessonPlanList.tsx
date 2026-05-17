import { LessonPlan } from "@/types/lessonPlan";
import LessonPlanCard from "./LessonPlanCard";

interface LessonPlanListProps {plans: LessonPlan[];}

export default function LessonPlanList({plans,}: LessonPlanListProps) {

    return (
        <div className="grid gap-4">
            {plans.map((plan) => (
                <LessonPlanCard
                    key={plan.id}
                    plan={plan}
                />
            ))}
        </div>
    );
}