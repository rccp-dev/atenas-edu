import { Submission } from "@/types/submission";
import { supabase } from "@/lib/supabase";

export async function getSubmissions(): Promise<Submission[]> {

    const { data, error } = await supabase
        .from("submissions")
        .select("*");

    if (error) {
        throw new Error(error.message);
    }

    return data || [];
}

export async function getSubmissionById(id: string) {

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

export async function createSubmission(
    data: Partial<Submission>
) {

    const { error } = await supabase
        .from("submissions")
        .insert(data);

    if (error) {
        throw new Error(error.message);
    }

}

export async function updateSubmission(
    id: string,
    data: Partial<Submission>
) {

    const { error } = await supabase
        .from("submissions")
        .update(data)
        .eq("id", id);

    if (error) {
        throw new Error(error.message);
    }

}

export async function deleteSubmission(id: string) {

    const { error } = await supabase
        .from("submissions")
        .delete()
        .eq("id", id);

    if (error) {
        throw new Error(error.message);
    }

}