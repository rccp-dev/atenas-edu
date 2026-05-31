import { Student } from "@/types/student";
import { mapStudent } from "@/mappers/student.mapper";
import type { SupabaseClient } from "@supabase/supabase-js";

export async function getStudents(supabase: SupabaseClient): Promise<Student[]> {

  const { data, error } = await supabase
    .from("students")
    .select("*");

  if (error) {
    throw new Error(error.message);
  }

  return (data || []).map(mapStudent);
}

export async function getStudentById(supabase: SupabaseClient, id: string) {

  const { data, error } = await supabase
    .from("students")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

    return data ? mapStudent(data) : null;
}

export async function createStudent(supabase: SupabaseClient, data: Partial<Student>) {
  const {data: student, error } = await supabase.from("students").insert({
    name: data.name,
    enrollment: data.enrollment,
    content: data.content,
    classroom_id: data.classroomId
  })
  .select()
  .single();

  if (error) {
    throw new Error(error.message);
  }

  return student;
}

export async function updateStudent(supabase: SupabaseClient, id: string, data: Partial<Student>) {
  const { error } = await supabase
    .from("students")
    .update({
      name: data.name,
      enrollment: data.enrollment,
      content: data.content,
      classroom_id: data.classroomId
    })
    .eq("id", id);

  if (error) throw new Error(error.message);
}

export async function deleteStudent(supabase: SupabaseClient, id: string) {

  const { error } = await supabase
    .from("students")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

}