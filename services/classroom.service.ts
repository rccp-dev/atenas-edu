import { Classroom } from "@/types/classroom";
import { supabase } from "@/lib/supabase";

/* 
    Service respobnsável por integração futura com database
    e busca, criação, edição e remoção de turmas
*/

export async function createClassroom(
  data: Partial<Classroom>
) {
  const { data: classroom, error } =
    await supabase
        .from("classrooms")
        .insert(data)
        .select()
        .single();

if (error) {
    throw error;
}

return classroom;
}

export function getClassroomDisplayName(classroom: Classroom) {
  return `${classroom.year}º Ano ${classroom.grade};`
}

export async function getClassrooms(): Promise<Classroom[]> {
   const { data, error } =
    await supabase
        .from("classrooms")
        .select("*");
        

if (error) {
    throw error;
}

return data || [];
}

export async function getClassroomById(id: string) {
    const { data, error } =
    await supabase
        .from("classrooms")
        .select("*")
        .eq("id", id)
        .single();

if (error) {
    throw error;
}

return data;
}

export async function updateClassroom(id: string, data: Partial<Classroom>) {
    /* Futuramente: update no banco e validação de permissões */
    const { data: classroom, error } =
    await supabase
        .from("classrooms")
        .update(data)
        .eq("id", id)
        .select()
        .single();

if (error) {
    throw error;
}

return classroom;
}

export async function deleteClassroom(id: string) {
    /* Futuramente: soft delete no Supabase e verificação de permissão */
    const { error } =
    await supabase
        .from("classrooms")
        .delete()
        .eq("id", id);
        

if (error) {
    throw error;
}

}