import { Student } from "@/types/student";
import {
    createStudentQuery,
    getStudentsQuery,
    getStudentByIdQuery,
    getStudentsByClassroomIdQuery,
    updateStudentQuery,
    deleteStudentQuery
} from "@/queries/student.querie";

/* 
    Service responsável por integração futura com database
    e busca, criação, edição e remoção de alunos
*/

export async function createStudent(
  data: Partial<Student>
) {

  const {data: student, error} =
  await createStudentQuery(data);

  if(error){
    throw error;
  }

  return student;
}

export async function getStudents(): Promise<Student[]> {
    const {data, error} = 
    await getStudentsQuery();

    if(error) {
        throw error;
    }
    return data || [];
}

export async function getStudentById(id: string) {
    const {data, error } =
    await getStudentByIdQuery(id);
   
    if (error) {
        throw error;
    }

    return data;
}

export async function getStudentsByClassroomId(classroomId: string) {
    const {data, error } = 
    await getStudentsByClassroomIdQuery(
      classroomId
    );

    if(error) {
        throw error;
    }

    return data || [];

}

export async function updateStudent(id: string, data: Partial<Student>) {
    /* Futuramente: update no banco e validação de permissões */

  const {data: student, error} =
  await updateStudentQuery(
    id,
    data
  )
  if(error){
    throw error;
  }

  return student;
}

export async function deleteStudent(id: string) {
    /* Futuramente: soft delete no Supabase e verificação de permissão */
  const { error } =
  await deleteStudentQuery(id);

  if(error){
    throw error;
  }

}