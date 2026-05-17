import { Student } from "@/types/student";
import { studentsMock } from "@/mocks/students.mock";

/* 
    Service respobnsável por integração futura com database
    e busca, criação, edição e remoção de alunos
*/

export async function createStudent(
  data: Partial<Student>
) {
  console.log("CREATE:", data);
}

export async function getStudents(): Promise<Student[]> {
    return studentsMock;
}

export async function getStudentsByClassroomId(classroomId: string) {
    return studentsMock.filter(
        (student) => student.classroomId === classroomId
    );
}

export async function updateStudent(id: string, data: Partial<Student>) {
    /* Futuramente: update no banco e validação de permissões */
    console.log("UPDATE:", id, data);
}

export async function deleteStudent(id: string) {
    /* Futuramente: soft delete no Supabase e verificação de permissão */
    console.log("DELETE:", id);
}