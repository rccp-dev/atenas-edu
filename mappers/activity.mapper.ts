import { Activity } from "@/types/activity";

export function mapActivity(db: any): Activity {
  return {
    id: db.id,
    title: db.title,
    description: db.description,
    deadline: db.deadline,
    token: db.token,
    classroomId: db.classroom_id,
    attachments: db.attachments,
    status: db.status,
    createdAt: db.created_at,
    updatedAt: db.updated_at
  };
}