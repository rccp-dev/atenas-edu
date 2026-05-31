import { LessonPlan } from "@/types/lessonPlan";

export function mapLessonPlan(db: any): LessonPlan {
  return {
    id: db.id,
    title: db.title,
    subjects: db.subjects,
    classroomId: db.classroom_id,
    description: db.description,
    content: db.content,
    createdAt: db.created_at,
    updatedAt: db.updated_at
  };
}