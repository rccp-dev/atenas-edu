import { Classroom } from "@/types/classroom";
import { 
    createClassroomQuery,
    getClassroomsQuery,
    getClassroomByIdQuery,
    updateClassroomQuery,
    deleteClassroomQuery
} from "@/queries/classroom.query";

/* 
    Service respobnsável por integração futura com database
    e busca, criação, edição e remoção de turmas
*/

export async function createClassroom(
  data: Partial<Classroom>
) {
  const { data: classroom, error } =
    await createClassroomQuery(data);
        

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
    await getClassroomsQuery();
        
        

if (error) {
    throw error;
}

return data || [];
}

export async function getClassroomById(id: string) {
    const { data, error } =
    await getClassroomByIdQuery(id);
        

if (error) {
    throw error;
}

return data;
}

export async function updateClassroom(id: string, data: Partial<Classroom>) {
    /* Futuramente: update no banco e validação de permissões */
    const { data: classroom, error } =
    await updateClassroomQuery(
        id,
        data
    )
       

if (error) {
    throw error;
}

return classroom;
}

export async function deleteClassroom(id: string) {
    /* Futuramente: soft delete no Supabase e verificação de permissão */
    const { error } =
    await deleteClassroomQuery(id);
       
        

if (error) {
    throw error;
}

}