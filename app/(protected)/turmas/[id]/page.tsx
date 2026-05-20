import { notFound } from "next/navigation";
import { getClassroomById } from "@/services/classroom.service";
import { getStudentsByClassroomId } from "@/services/student.service";

import ClassroomView from "@/components/turma/ClassroomView";
import ClassroomEdit from "@/components/turma/ClassroomEdit";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams?: {
    mode?: "view" | "edit";
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const { id } = await params;
  const sp = await searchParams;
  const turma = await getClassroomById(id);

  if (!turma) notFound();

  const students = await getStudentsByClassroomId(turma.id);

  const mode = sp?.mode ?? "view";

  if (mode === "edit") {
    return <ClassroomEdit classroom={turma} />;
  }

  return <ClassroomView classroom={turma} students={students} />;
}
