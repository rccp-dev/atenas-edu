import { Submission } from "@/types/submission";
import { supabase} from "@/lib/supabase";

export async function createSubmissionQuery(data: Partial<Submission>){
    return await supabase
        .from("submissions")
        .select("*")
        .eq("activityId", data.activityId)
        .eq("studentId", data.studentId)
        .maybeSingle();
}

export async function getSubmissionsQuery(){
    return await supabase
    .from("submissions")
    .select("*");
}

export async function getSubmissionByIdQuery( id: string ){
    return await supabase
    .from("submissions")
    .select("*")
    .eq("id", id)
    .single();
}

export async function getSubmissionsByActivityIdQuery( activityId: string ){
    return await supabase
    .from("submissions")
    .select("*")
    .eq("activityId", activityId);
}

export async function getSubmissionByActivityAndStudentQuery( activityId: string, studentId: string ){
    return await supabase
    .from("submissions")
    .select("*")
    .eq("activityId", activityId)
    .eq("studentId", studentId)
    .maybeSingle();
}

export async function updateSubmissionQuery( id: string, data:Partial<Submission> ){
    return await supabase
    .from("submissions")
    .update(data)
    .eq("id", id)
    .select()
    .single();
}

export async function deleteSubmissionQuery( id: string ){
    return await supabase
     .from("submissions")
     .delete()
     .eq("id", id);
}