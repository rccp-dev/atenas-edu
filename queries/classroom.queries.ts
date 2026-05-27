import { Student } from '@/types/student';
import { supabase } from '@/lib/supabase';
import { Classroom } from '@/types/classroom';

export async function getClassroomDisplayName(classroom: Classroom): Promise<Student[]> {

    const { data, error } = await supabase
        .from('students')
        .select('*')
        .eq('classroomId', classroomId);

    if (error) {
        throw new Error(error.message);
    }

    return data ?? [];

}