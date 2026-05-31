import { Activity } from "@/types/activity";
import { mapActivity } from "@/mappers/activity.mapper";
import type { SupabaseClient } from "@supabase/supabase-js";

import { notFound } from "next/navigation";

export async function getActivityByToken(supabase: SupabaseClient, token: string): Promise<Activity> {

    const { data, error } = await supabase
        .from("activities")
        .select("*")
        .eq("token", token)
        .single();
    
    if (!data) {
        notFound();
    }

    if(error) {
        throw new Error(error.message);
    }

    return  mapActivity(data);
}