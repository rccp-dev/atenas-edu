import { Submission } from "@/types/submission";
import { supabase} from "@/lib/supabase";

export async function createActivityQuery(data: Partial<Submission>){
    return await supabase
       .from("activities")
       .insert(data)
       .select()
       .single();
}

export async function getActivitiesQuery(){
    return await supabase
   .from("activities")
    .select("*");
}

export async function getActivityByIdQuery( id: string ){
    return await supabase
   .from("activities")
    .select("*")
    .eq("id", id)
    .single();
}

export async function getActivityByTokenQuery( token: string ){
    return await supabase
    .from("activities")
    .select("*")
    .eq("token", token)
    .single();
}


export async function updateActivityQuery( id: string, data:Partial<Submission> ){
    return await supabase
      .from("activities")
        .update(data)
        .eq("id", id)
        .select()
        .single();
}

export async function deleteActivityQuery( id: string ){
    return await supabase
    .from("activities")
    .delete()
    .eq("id", id);
}