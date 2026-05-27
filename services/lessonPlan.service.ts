import { LessonPlan } from "@/types/lessonPlan";
import { supabase } from "@/lib/supabase";

export async function getLessonPlans(): Promise<LessonPlan[]> {

    const { data, error } = await supabase
        .from("lesson_plans")
        .select("*");

    if (error) {
        throw new Error(error.message);
    }

    return data || [];
}

export async function getLessonPlanById(id: string) {

    const { data, error } = await supabase
        .from("lesson_plans")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export async function createLessonPlan(
    data: Partial<LessonPlan>
) {

    const { error } = await supabase
        .from("lesson_plans")
        .insert(data);

    if (error) {
        throw new Error(error.message);
    }

}

export async function updateLessonPlan(
    id: string,
    data: Partial<LessonPlan>
) {

    const { error } = await supabase
        .from("lesson_plans")
        .update(data)
        .eq("id", id);

    if (error) {
        throw new Error(error.message);
    }

}

export async function deleteLessonPlan(id: string) {

    const { error } = await supabase
        .from("lesson_plans")
        .delete()
        .eq("id", id);

    if (error) {
        throw new Error(error.message);
    }

}