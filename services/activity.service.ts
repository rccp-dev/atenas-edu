import { Activity } from "@/types/activity";
import { supabase } from "@/lib/supabase";

export async function getActivities(): Promise<Activity[]> {

    const { data, error } = await supabase
        .from("activities")
        .select("*");

    if (error) {
        throw new Error(error.message);
    }

    return data || [];
}

export async function getActivityById(id: string) {

    const { data, error } = await supabase
        .from("activities")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export async function createActivity(
    data: Partial<Activity>
) {

    const { error } = await supabase
        .from("activities")
        .insert(data);

    if (error) {
        throw new Error(error.message);
    }

}

export async function updateActivity(
    id: string,
    data: Partial<Activity>
) {

    const { error } = await supabase
        .from("activities")
        .update(data)
        .eq("id", id);

    if (error) {
        throw new Error(error.message);
    }

}

export async function deleteActivity(id: string) {

    const { error } = await supabase
        .from("activities")
        .delete()
        .eq("id", id);

    if (error) {
        throw new Error(error.message);
    }

}