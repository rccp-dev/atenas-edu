import ActivityView from "@/components/atividade/ActivityView";
import ActivityEdit from "@/components/atividade/ActivityEdit";
import ActivityDraft from "@/components/atividade/ActivityDraft";

import { getActivityById } from "@/services/activity.service";
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

  const activity = await getActivityById(supabase, id);

  if (!activity) notFound();

  const mode = sp?.mode ?? "view";

  switch (mode) {

    case "draft":
        return <ActivityDraft activity={activity} />;

    case "edit":
        return <ActivityEdit activity={activity} />;

    case "view":
    default:
        return <ActivityView activity={activity} />;

  }
}
