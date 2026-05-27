import { Activity } from "@/types/activity";
import { supabase } from "@/lib/supabase";

export async function getActivityByToken(token: string): Promise<Activity>{

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