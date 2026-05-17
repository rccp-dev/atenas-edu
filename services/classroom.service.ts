import { Classroom } from "@/types/classroom";
import { classroomsMock } from "@/mocks/classrooms.mock";

/* 
    Service respobnsável por integração futura com database
    e busca, criação, edição e remoção de turmas
*/

export async function createClassroom(
  data: Partial<Classroom>
) {
  console.log("CREATE:", data);
}

export async function getClassrooms(): Promise<Classroom[]> {
    return classroomsMock;
}

export async function getClassroomById(id: string) {
    return classroomsMock.find(
        (classroom) => classroom.id === id
    );
}

export async function updateClassroom(id: string, data: Partial<Classroom>) {
    /* Futuramente: update no banco e validação de permissões */
    console.log("UPDATE:", id, data);
}

export async function deleteClassroom(id: string) {
    /* Futuramente: soft delete no Supabase e verificação de permissão */
    console.log("DELETE:", id);
}