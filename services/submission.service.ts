import { Submission } from "@/types/submission";
import { 
    createSubmissionQuery,
    getSubmissionsQuery,
    getSubmissionByIdQuery,
    getSubmissionsByActivityIdQuery,
    getSubmissionByActivityAndStudentQuery,
    updateSubmissionQuery,
    deleteSubmissionQuery} from "@/queries/submission.query";

export async function createSubmission(data: Partial<Submission>) {
  const { data: existing, error: existingError } =
        await getSubmissionByActivityAndStudentQuery(
            data.activityId!,
            data.studentId!
        );

    if (existingError) {
        throw existingError;
    }
if (existing) {
    return existing;
}

const { data: submission, error } =
    await createSubmissionQuery(data);
       
if (error) {
    throw error;
}

return submission;
}

export async function getSubmissions(): Promise<Submission[]> {
 const { data, error } =
    await getSubmissionsQuery();
        

if (error) {
    throw error;
}

return data || [];
}

export async function getSubmissionById(id: string) {
  const { data, error } =
    await getSubmissionByIdQuery(id);
        

if (error) {
    throw error;
}

return data;
}

export async function getSubmissionsByActivityId(activityId: string) {
  const { data, error } =
    await getSubmissionsByActivityIdQuery(activityId)
       

if (error) {
    throw error;
}

return data || [];
}

export async function getSubmissionByActivityAndStudent(
    activityId: string,
    studentId: string
) {
    const { data, error } =
    await getSubmissionByActivityAndStudentQuery(
        activityId,
        studentId
    )
        


if (error) {
    throw error;
}

return data;
}

export async function updateSubmission(id: string, data: Partial<Submission>) {
  const { data: submission, error } =
    await updateSubmissionQuery(
        id,
        data
    )
        

if (error) {
    throw error;
}

return submission;
}

export async function deleteSubmission(id: string) {
  const { error } =
    await deleteSubmissionQuery(id)
       

if (error) {
    throw error;
}

}