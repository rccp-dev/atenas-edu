import SubmissionView from "@/components/envio/SubmissionView";
import SubmissionEdit from "@/components/envio/SubmissionEdit";
import { getSubmissionById } from "@/services/submission.service";
import { notFound } from "next/navigation";

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
  const submission = await getSubmissionById(id);

  if (!submission) return notFound();

  const mode = sp?.mode ?? "view";

  if (mode === "edit") {
    return <SubmissionEdit submission={submission} />;
  }

  return <SubmissionView submission={submission} />;
}