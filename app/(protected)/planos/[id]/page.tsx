import LessonPlanView from "@/components/plano/LessonPlanView";
import LessonPlanEdit from "@/components/plano/LessonPlanEdit";
import { getLessonPlanById } from "@/services/lessonPlan.service";
import { getClassroomById } from "@/services/classroom.service";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{
        id: string;
    }>;
    searchParams?: {
        mode?: "view" | "edit";
    };
}

export default async function Page({params, searchParams}: PageProps) {

    const { id } = await params; 
    const sp = await searchParams;
 
    const plan = await getLessonPlanById(id);
    
    if (!plan) notFound();
    
    const mode = sp?.mode ?? "view";

    if (mode === "edit") {
        return <LessonPlanEdit plan={plan} />;
    }
    
    return <LessonPlanView plan={plan} />;
}