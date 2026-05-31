import { Student } from "@/types/student";

export function mapStudent(db: any): Student {
  return {
    id: db.id,
    name: db.name,
    enrollment: db.enrollment,
    content: db.content,
    classroomId: db.classroom_id,
    createdAt: db.created_at,
    updatedAt: db.updated_at,
    isDraft: db.is_draft,
  };
}