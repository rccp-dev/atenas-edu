import StudentView from "@/components/aluno/StudentView";
import StudentEdit from "@/components/aluno/StudentEdit";
import { getStudentById } from "@/services/student.service";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams?: {
    mode?: "view" | "edit";
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const { id } = await params;
  const sp = await searchParams;
  const student = await getStudentById(id);

  if (!student) return notFound();

  const mode = sp?.mode ?? "view";

  if (mode === "edit") {
    return <StudentEdit student={student} />;
  }

  return <StudentView student={student} />;
}