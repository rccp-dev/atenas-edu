import { Activity } from "@/types/activity";
import type { SupabaseClient } from "@supabase/supabase-js";

export async function getActivityByToken(supabase: SupabaseClient, token: string): Promise<Activity> {

    const { data, error } = await supabase
        .from("activities")
        .select("*")
        .eq("token", token)
        .single();
    
    if(error) {
        throw new Error(error.message);
    }

    return data || [];
}