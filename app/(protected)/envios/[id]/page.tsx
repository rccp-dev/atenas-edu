import SubmissionView from "@/components/envio/SubmissionView";
import Grading from "@/components/envio/Grading";
import { getSubmissionById } from "@/services/submission.service";
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

export default async function Page({params, searchParams}: PageProps) {

  const { id } = await params;
  const sp = await searchParams;
  const supabase = await serverClient();

  const submission = await getSubmissionById(supabase, id);

  if (!submission) notFound();

  const mode = sp?.mode ?? "view";

  if (mode === "edit") {
    return <Grading submission={submission} />;
  }

  return <SubmissionView submission={submission} />;
}