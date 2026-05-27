import { Student } from "@/types/student";
import { supabase } from "@/lib/supabase";

export async function getStudents(): Promise<Student[]> {

  const { data, error } = await supabase
    .from("students")
    .select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
}

export async function getStudentById(id: string) {

  const { data, error } = await supabase
    .from("students")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function createStudent(
  data: Partial<Student>
) {

  const { error } = await supabase
    .from("students")
    .insert(data);

  if (error) {
    throw new Error(error.message);
  }

}

export async function updateStudent(
  id: string,
  data: Partial<Student>
) {

  const { error } = await supabase
    .from("students")
    .update(data)
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

}

export async function deleteStudent(id: string) {

  const { error } = await supabase
    .from("students")
    .delete()
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

}