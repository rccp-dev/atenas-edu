import StudentView from "@/components/aluno/StudentView";
import StudentEdit from "@/components/aluno/StudentEdit";
import { getStudentById } from "@/services/student.service";
import { notFound } from "next/navigation";

import { serverClient } from "@/lib/supabase/server";

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
  const supabase = await serverClient();

  const student = await getStudentById(supabase, id);

  if (!student) notFound();

  const mode = sp?.mode ?? "view";

  if (mode === "edit") {
    return <StudentEdit student={student} />;
  }

  return <StudentView student={student} />;
}