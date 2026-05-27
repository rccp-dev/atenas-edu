import { Submission } from "@/types/submission";
import { supabase} from "@/lib/supabase";

export async function createClassroomQuery(data: Partial<Submission>){
    return await supabase
      .from("classrooms")
      .insert(data)
      .select()
      .single();
}

export async function getClassroomsQuery(){
    return await supabase
    .from("classrooms")
    .select("*");
}

export async function getClassroomByIdQuery( id: string ){
    return await supabase
    .from("classrooms")
    .select("*")
    .eq("id", id)
    .single();

}

export async function updateClassroomQuery( id: string, data:Partial<Submission> ){
    return await supabase
    .from("classrooms")
    .update(data)
    .eq("id", id)
    .select()
    .single();
}

export async function deleteClassroomQuery( id: string ){
    return await supabase
    .from("classrooms")
    .delete()
    .eq("id", id);
}
