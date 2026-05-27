import { Submission } from "@/types/submission";
import { supabase } from "@/lib/supabase";

export async function getSubmissionsByActivityId(activityId: string): Promise<Submission[]> {

    const { data, error } = await supabase
        .from("submissions")
        .select("*")
        .eq("activityId", activityId);

    if (error) {
        throw new Error(error.message);
    }

    return data ?? [];

}

export async function getSubmissionByActivityAndStudent(activityId: string, studentId: string): Promise<Submission[]> {

    const { data, error } = await supabase
        .from("submissions")
        .select("*")
        .eq("activityId", activityId)
        .eq("studentId", studentId)
        .maybeSingle();

    if (error) {
        throw new Error(error.message);
    }

    return data ?? [];

}