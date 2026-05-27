import { Submission } from "@/types/submission";
import { supabase} from "@/lib/supabase";

export async function createLessonPlanQuery(data: Partial<Submission>){
    return await supabase
      .from("lesson_plans")
      .insert(data)
      .select()
      .single();

}

export async function getLessonPlansQuery(){
    return await supabase
    .from("lesson_plans")
    .select("*")
}

export async function getLessonPlanByIdQuery( id: string ){
    return await supabase
    .from("lesson_plans")
    .select("*")
    .eq("id", id)
    .single();

}

export async function updateLessonPlanQuery( id: string, data:Partial<Submission> ){
    return await supabase
     .from("lesson_plans")
     .update(data)
     .eq("id", id)
     .select()
     .single();
}

export async function deleteLessonPlanQuery( id: string ){
    return await supabase
    .from("lesson_plans")
    .delete()
    .eq("id", id);
}
