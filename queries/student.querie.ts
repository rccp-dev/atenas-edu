import { Student } from "@/types/student";
import { supabase } from "@/lib/supabase";


export async function createStudentQuery(
    data: Partial<Student>
) {

    return await supabase
        .from("students")
        .insert(data)
        .select()
        .single();
}



export async function getStudentsQuery() {

    return await supabase
        .from("students")
        .select("*");
}

export async function getStudentByIdQuery(
    id: string
) {

    return await supabase
        .from("students")
        .select("*")
        .eq("id", id)
        .single();
}


export async function getStudentsByClassroomIdQuery(
    classroomId: string
) {

    return await supabase
        .from("students")
        .select("*")
        .eq("classroomId", classroomId);
}


export async function updateStudentQuery(
    id: string,
    data: Partial<Student>
) {
 return await supabase
        .from("students")
        .update(data)
        .eq("id", id)
        .select()
        .single();
}


export async function deleteStudentQuery(
    id: string
) {

    return await supabase
        .from("students")
        .delete()
        .eq("id", id);
}

