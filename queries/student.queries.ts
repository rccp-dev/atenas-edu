import { Student } from '@/types/student';
import { supabase } from '@/lib/supabase';

export async function getStudentsByClassroomId(classroomId: string): Promise<Student[]> {

    const { data, error } = await supabase
        .from('students')
        .select('*')
        .eq('classroomId', classroomId);

    if (error) {
        throw new Error(error.message);
    }

    return data ?? [];

}