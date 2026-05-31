import { Submission } from "@/types/submission";

export function mapSubmission(db: any): Submission {
  return {
    id: db.id,
    activityId: db.activity_id,
    studentId: db.student_id,
    classroomId: db.classroom_id,
    file_url: db.file_url,
    grade: db.grade,
    feedback: db.feedback,
    status: db.status,
    createdAt: db.created_at,
    submittedAt: db.submitted_at
  };
}