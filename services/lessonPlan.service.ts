import { LessonPlan } from "@/types/lessonPlan";
import { mapLessonPlan } from "@/mappers/lessonPlan.mapper";
import type { SupabaseClient } from "@supabase/supabase-js";

export async function getLessonPlans(supabase: SupabaseClient): Promise<LessonPlan[]> {

    const { data, error } = await supabase
        .from("lesson_plans")
        .select("*");

    if (error) {
        throw new Error(error.message);
    }

    return (data || []).map(mapLessonPlan);
}

export async function getLessonPlanById(supabase: SupabaseClient, id: string) {

    const { data, error } = await supabase
        .from("lesson_plans")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return data ? mapLessonPlan(data) : null;
}

export async function createLessonPlan(
  supabase: SupabaseClient,
  data: Partial<LessonPlan>
) {
  const { error } = await supabase.from("lesson_plans").insert({
    title: data.title,
    subjects: data.subjects,
    classroom_id: data.classroomId,
    description: data.description,
    content: data.content,
    is_draft: data.isDraft,
  });

  if (error) throw new Error(error.message);
}

export async function updateLessonPlan(
  supabase: SupabaseClient,
  id: string,
  data: Partial<LessonPlan>
) {
  const { error } = await supabase
    .from("lesson_plans")
    .update({
      title: data.title,
      subjects: data.subjects,
      classroom_id: data.classroomId,
      description: data.description,
      content: data.content,
      is_draft: data.isDraft,
    })
    .eq("id", id);

  if (error) throw new Error(error.message);
}

export async function deleteLessonPlan(supabase: SupabaseClient, id: string) {

    const { error } = await supabase
        .from("lesson_plans")
        .delete()
        .eq("id", id);

    if (error) {
        throw new Error(error.message);
    }

}