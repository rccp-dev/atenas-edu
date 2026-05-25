import { Submission } from "@/types/submission";
import { supabase} from "@/lib/supabase";

export async function createSubmission(data: Partial<Submission>) {
  const { data: existing } =
    await supabase
        .from("submissions")
        .select("*")
        .eq("activityId", data.activityId)
        .eq("studentId", data.studentId)
        .maybeSingle();

if (existing) {
    return existing;
}

const { data: submission, error } =
    await supabase
        .from("submissions")
        .insert(data)
        .select()
        .single();

if (error) {
    throw error;
}

return submission;
}

export async function getSubmissions(): Promise<Submission[]> {
 const { data, error } =
    await supabase
        .from("submissions")
        .select("*");

if (error) {
    throw error;
}

return data || [];
}

export async function getSubmissionById(id: string) {
  const { data, error } =
    await supabase
        .from("submissions")
        .select("*")
        .eq("id", id)
        .single();

if (error) {
    throw error;
}

return data;
}

export async function getSubmissionsByActivityId(activityId: string) {
  const { data, error } =
    await supabase
        .from("submissions")
        .select("*")
        .eq("activityId", activityId);

if (error) {
    throw error;
}

return data || [];
}

export async function getSubmissionByActivityAndStudent(
    activityId: string,
    studentId: string
) {
    const { data, error } =
    await supabase
        .from("submissions")
        .select("*")
        .eq("activityId", activityId)
        .eq("studentId", studentId)
        .maybeSingle();


if (error) {
    throw error;
}

return data;
}

export async function updateSubmission(id: string, data: Partial<Submission>) {
  const { data: submission, error } =
    await supabase
        .from("submissions")
        .update(data)
        .eq("id", id)
        .select()
        .single();

if (error) {
    throw error;
}

return submission;
}

export async function deleteSubmission(id: string) {
  const { error } =
    await supabase
        .from("submissions")
        .delete()
        .eq("id", id);

if (error) {
    throw error;
}

}