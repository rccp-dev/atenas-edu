import { Activity } from "@/types/activity";
import { supabase } from "@/lib/supabase";

export async function createActivity(data: Partial<Activity>) {
  const { data: activity, error } =
    await supabase
        .from("activities")
        .insert(data)
        .select()
        .single();

if (error) {
    throw error;
}

return activity;
}

export async function getActivities(): Promise<Activity[]> {
  const { data, error } =
    await supabase
        .from("activities")
        .select("*");
        

if (error) {
    throw error;
}

return data || [];
}

export async function getActivityById(id: string) {
    const { data, error } =
    await supabase
        .from("activities")
        .select("*")
        .eq("id", id)
        .single();

if (error) {
    throw error;
}

return data;
}

export async function getActivityByToken(token: string) {
   const { data, error } =
    await supabase
        .from("activities")
        .select("*")
        .eq("token", token)
        .single();

if (error) {
    throw error;
}

return data;
}

export function getActivityStatus(
    activity: Activity
) {

    if (
        activity.status?.includes("Corrigida")
    ) {
        return "Corrigida";
    }

    if (!activity.deadline) {
        return "Atribuída";
    }

    const now = new Date();

    const deadline = new Date(
        activity.deadline
    );

    if (!isNaN(deadline.getTime())) {

        if (now > deadline) {
            return "Encerrada";
        }

    }

    return "Atribuída";
}

export async function updateActivity(id: string, data: Partial<Activity>) {
  const { data: activity, error } =
    await supabase
        .from("activities")
        .update(data)
        .eq("id", id)
        .select()
        .single();

if (error) {
    throw error;
}

return activity;
}

export async function deleteActivity(id: string) {
  const { error } =
    await supabase
        .from("activities")
        .delete()
        .eq("id", id);
if (error) {
    throw error;
}


}