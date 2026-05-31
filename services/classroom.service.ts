import { Classroom } from "@/types/classroom";
import type { SupabaseClient } from "@supabase/supabase-js";

export async function getClassrooms(supabase: SupabaseClient): Promise<Classroom[]> {

    const { data, error } = await supabase
        .from("classrooms")
        .select("*");

    if (error) {
        throw new Error(error.message);
    }

    return data || [];
}

export async function getClassroomById(supabase: SupabaseClient, id: string) {

    const { data, error } = await supabase
        .from("classrooms")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export function getClassroomDisplayName(classroom: Classroom) {

    return `${classroom.grade}º ano ${classroom.section}`;

}

export async function createClassroom(supabase: SupabaseClient, data: Partial<Classroom>) {

    const { error } = await supabase
        .from("classrooms")
        .insert(data);

    if (error) {
        throw new Error(error.message);
    }

}

export async function updateClassroom(supabase: SupabaseClient, id: string, data: Partial<Classroom>) {

    const { error } = await supabase
        .from("classrooms")
        .update(data)
        .eq("id", id);

    if (error) {
        throw new Error(error.message);
    }

}

export async function deleteClassroom(supabase: SupabaseClient, id: string) {

    const { error } = await supabase
        .from("classrooms")
        .delete()
        .eq("id", id);

    if (error) {
        throw new Error(error.message);
    }

}