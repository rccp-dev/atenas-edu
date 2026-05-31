import { Activity } from "@/types/activity";
import { mapActivity } from "@/mappers/activity.mapper";
import type { SupabaseClient } from "@supabase/supabase-js";

export async function getActivities(supabase: SupabaseClient): Promise<Activity[]> {

    const { data, error } = await supabase
        .from("activities")
        .select("*");

    if (error) {
        throw new Error(error.message);
    }

    return (data || []).map(mapActivity);;
}

export async function getActivityById(supabase: SupabaseClient, id: string) {

    const { data, error } = await supabase
        .from("activities")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return data ? mapActivity(data) : null;
}

export function getActivityStatus(activity: Activity) {

    if (activity.status === "Corrigida") {
        return "Corrigida";
    }

    if (activity.deadline) {

        const now = new Date();

        const deadline = new Date(
            activity.deadline
        );

        if (
            !isNaN(deadline.getTime()) &&
            now > deadline
        ) {
            return "Em atraso";
        }

    }

    return "Atribuída";

}

export async function createActivity(supabase: SupabaseClient, data: Partial<Activity>) {
  const { error } = await supabase.from("activities").insert({
    title: data.title,
    description: data.description,
    deadline: data.deadline,
    token: data.token,
    classroom_id: data.classroomId,
    attachments: data.attachments,
    status: data.status,
    is_draft: data.isDraft,
  });

  if (error) throw new Error(error.message);
}

export async function updateActivity(supabase: SupabaseClient, id: string, data: Partial<Activity>) {
  const { error } = await supabase
    .from("activities")
    .update({
      title: data.title,
      description: data.description,
      deadline: data.deadline,
      classroom_id: data.classroomId,
      attachments: data.attachments,
      status: data.status,
      is_draft: data.isDraft,
    })
    .eq("id", id);

  if (error) throw new Error(error.message);
}

export async function deleteActivity(supabase: SupabaseClient, id: string) {

    const { error } = await supabase
        .from("activities")
        .delete()
        .eq("id", id);

    if (error) {
        throw new Error(error.message);
    }

}