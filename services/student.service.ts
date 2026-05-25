import { Student } from "@/types/student";
import { supabase } from "@/lib/supabase";

/* 
    Service responsável por integração futura com database
    e busca, criação, edição e remoção de alunos
*/

export async function createStudent(
  data: Partial<Student>
) {

  const {data: student, error} =
  await supabase
  .from("students")
  .insert(data)
  .select()
  .single();

  if(error){
    throw error;
  }

  return student;
}

export async function getStudents(): Promise<Student[]> {
    const {data, error} = 
    await supabase
    .from("students")
    .select("*");

    if(error) {
        throw error;
    }
    return data || [];
}

export async function getStudentById(id: string) {
    const {data, error } =
    await supabase
    .from("students")
    .select("*")
    .eq("id", id)
    .single();

    if (error) {
        throw error;
    }

    return data;
}

export async function getStudentsByClassroomId(classroomId: string) {
    const {data, error } = 
    await supabase
    .from("students")
    .select("*")
    .eq("classroomId", classroomId);

    if(error) {
        throw error;
    }

    return data || [];

}

export async function updateStudent(id: string, data: Partial<Student>) {
    /* Futuramente: update no banco e validação de permissões */

  const {data: student, error} =
  await supabase
  .from("students")
  .update(data)
  .eq("id" , id)
  .select()
  .single();

  if(error){
    throw error;
  }

  return student;
}

export async function deleteStudent(id: string) {
    /* Futuramente: soft delete no Supabase e verificação de permissão */
  const { error } =
  await supabase
  .from("students")
  .delete()
  .eq("id", id);

  if(error){
    throw error;
  }

}