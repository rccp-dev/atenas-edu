import ActivityView from "@/components/atividade/ActivityView";
import ActivityEdit from "@/components/atividade/ActivityEdit";
import { getActivityById } from "@/services/activity.service";
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

  const activity = await getActivityById(supabase, id);

  if (!activity) notFound();

  const mode = sp?.mode ?? "view";

  if (mode === "edit") {
    return <ActivityEdit activity={activity} />;
  }

  return <ActivityView activity={activity} />;
}
