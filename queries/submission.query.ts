import { Submission } from "@/types/submission";
import type { SupabaseClient } from "@supabase/supabase-js";

export async function getSubmissionsByActivityId(supabase: SupabaseClient, activityId: string): Promise<Submission[]> {

    const { data, error } = await supabase
        .from("submissions")
        .select("*")
        .eq("activityId", activityId);

    if (error) {
        throw new Error(error.message);
    }

    return data ?? [];

}

export async function getSubmissionByActivityAndStudent(supabase: SupabaseClient, activityId: string, studentId: string): Promise<Submission> {

    const { data, error } = await supabase
        .from("submissions")
        .select("*")
        .eq("activityId", activityId)
        .eq("studentId", studentId)
        .maybeSingle();

    if (error) {
        throw new Error(error.message);
    }

    return data;

}