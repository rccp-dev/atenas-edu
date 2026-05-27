import { Classroom } from "@/types/classroom";
import { supabase } from "@/lib/supabase";

export async function getClassrooms(): Promise<Classroom[]> {

    const { data, error } = await supabase
        .from("classrooms")
        .select("*");

    if (error) {
        throw new Error(error.message);
    }

    return data || [];
}

export async function getClassroomById(id: string) {

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

export async function createClassroom(
    data: Partial<Classroom>
) {

    const { error } = await supabase
        .from("classrooms")
        .insert(data);

    if (error) {
        throw new Error(error.message);
    }

}

export async function updateClassroom(
    id: string,
    data: Partial<Classroom>
) {

    const { error } = await supabase
        .from("classrooms")
        .update(data)
        .eq("id", id);

    if (error) {
        throw new Error(error.message);
    }

}

export async function deleteClassroom(id: string) {

    const { error } = await supabase
        .from("classrooms")
        .delete()
        .eq("id", id);

    if (error) {
        throw new Error(error.message);
    }

}