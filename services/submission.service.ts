import { Submission } from "@/types/submission";
import { submissionsMock } from "@/mocks/submissions.mock";

export async function createSubmission(data: Partial<Submission>) {
  console.log("CREATE:", data);
}

export async function getSubmissions(): Promise<Submission[]> {
  return submissionsMock;
}

export async function getSubmissionById(id: string) {
  return submissionsMock.find((submission) => submission.id === id);
}

export async function updateSubmission(id: string, data: Partial<Submission>) {
  console.log("UPDATE:", id, data);
}

export async function deleteSubmission(id: string) {
  console.log("DELETE:", id);
}