import { Classroom } from "@/types/classroom";

export function mapClassroom(db: any): Classroom {
  return {
    id: db.id,
    grade: db.grade,
    section: db.section,
    description: db.description,
    createdAt: db.created_at,
    updatedAt: db.updated_at
  };
}