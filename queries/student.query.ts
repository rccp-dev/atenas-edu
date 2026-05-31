import { Student } from '@/types/student';
import { mapStudent } from '@/mappers/student.mapper';
import type { SupabaseClient } from "@supabase/supabase-js";

export async function getStudentsByClassroomId(supabase: SupabaseClient, classroomId: string): Promise<Student[]> {

    const { data, error } = await supabase
        .from('students')
        .select('*')
        .eq('classroom_id', classroomId);

    if (error) {
        throw new Error(error.message);
    }

    return data ? data.map(mapStudent) : [];
}