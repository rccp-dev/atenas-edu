import LessonPlanView from "@/components/plano/LessonPlanView";
import LessonPlanEdit from "@/components/plano/LessonPlanEdit";
import LessonPlanDraft from "@/components/plano/LessonPlanDraft";

import { getLessonPlanById } from "@/services/lessonPlan.service";
import { notFound } from "next/navigation";

import { serverClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams?: {
    mode?: "view" | "edit" | "draft";
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const { id } = await params;
  const sp = await searchParams;
  const supabase = await serverClient();

  const plan = await getLessonPlanById(supabase, id);

  if (!plan) notFound();

  const mode = sp?.mode ?? "view";

  switch (mode) {

    case "draft":
        return <LessonPlanDraft plan={plan} />;

    case "edit":
        return <LessonPlanEdit plan={plan} />;

    case "view":
    default:
        return <LessonPlanView plan={plan} />;

  }
}
