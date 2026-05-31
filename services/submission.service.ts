import { Submission } from "@/types/submission";
import type { SupabaseClient } from "@supabase/supabase-js";

export async function getSubmissions(supabase: SupabaseClient): Promise<Submission[]> {

    const { data, error } = await supabase
        .from("submissions")
        .select("*");

    if (error) {
        throw new Error(error.message);
    }

    return data || [];
}

export async function getSubmissionById(supabase: SupabaseClient, id: string) {

    const { data, error } = await supabase
        .from("submissions")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export async function createSubmission(supabase: SupabaseClient, data: Partial<Submission>) {

    const { error } = await supabase
        .from("submissions")
        .insert(data);

    if (error) {
        throw new Error(error.message);
    }

}

export async function updateSubmission(supabase: SupabaseClient, id: string, data: Partial<Submission>) {

    const { error } = await supabase
        .from("submissions")
        .update(data)
        .eq("id", id);

    if (error) {
        throw new Error(error.message);
    }

}

export async function deleteSubmission(supabase: SupabaseClient, id: string) {

    const { error } = await supabase
        .from("submissions")
        .delete()
        .eq("id", id);

    if (error) {
        throw new Error(error.message);
    }

}