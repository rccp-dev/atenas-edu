import LessonPlanView from "@/components/plano/LessonPlanView";
import LessonPlanEdit from "@/components/plano/LessonPlanEdit";
import { getLessonPlanById } from "@/services/lessonPlan.service";
import { notFound } from "next/navigation";

import { serverClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const supabase = await serverClient();

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

  const plan = await getLessonPlanById(supabase, id);

  if (!plan) notFound();

  const mode = sp?.mode ?? "view";

  if (mode === "edit") {
    return <LessonPlanEdit plan={plan} />;
  }

  return <LessonPlanView plan={plan} />;
}
