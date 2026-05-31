import { notFound } from "next/navigation";
import { getClassroomById } from "@/services/classroom.service";
import { getStudentsByClassroomId } from "@/queries/student.query";

import ClassroomView from "@/components/turma/ClassroomView";
import ClassroomEdit from "@/components/turma/ClassroomEdit";

import { serverClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams?: {
    mode?: "view" | "edit";
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const { id } = await params;
  const sp = await searchParams;
  const supabase = await serverClient();

  const turma = await getClassroomById(supabase, id);

  if (!turma) notFound();

  const students = await getStudentsByClassroomId(supabase, turma.id);

  const mode = sp?.mode ?? "view";

  if (mode === "edit") {
    return <ClassroomEdit classroom={turma} />;
  }

  return <ClassroomView classroom={turma} students={students} />;
}