import { Activity } from "@/types/activity";
import { 
    createActivityQuery,
    getActivitiesQuery,
    getActivityByIdQuery,
    getActivityByTokenQuery,
    updateActivityQuery,
    deleteActivityQuery} from "@/queries/submission.query";

export async function createActivity(data: Partial<Activity>) {
  const { data: activity, error } =
    await createActivityQuery(data);
       

if (error) {
    throw error;
}

return activity;
}

export async function getActivities(): Promise<Activity[]> {
  const { data, error } =
    await getActivitiesQuery();
        
        

if (error) {
    throw error;
}

return data || [];
}

export async function getActivityById(id: string) {
    const { data, error } =
    await getActivityByIdQuery(id);
        

if (error) {
    throw error;
}

return data;
}

export async function getActivityByToken(token: string) {
   const { data, error } =
    await getActivityByTokenQuery(token)
        
if (error) {
    throw error;
}

return data;
}

export function getActivityStatus(
    activity: Activity
) {

    if (
        activity.status?.includes("Corrigida")
    ) {
        return "Corrigida";
    }

    if (!activity.deadline) {
        return "Atribuída";
    }

    const now = new Date();

    const deadline = new Date(
        activity.deadline
    );

    if (!isNaN(deadline.getTime())) {

        if (now > deadline) {
            return "Encerrada";
        }

    }

    return "Atribuída";
}

export async function updateActivity(id: string, data: Partial<Activity>) {
  const { data: activity, error } =
    await updateActivityQuery(
        id,
        data
    );
       
if (error) {
    throw error;
}

return activity;
}

export async function deleteActivity(id: string) {
  const { error } =
    await deleteActivityQuery(id);
       
if (error) {
    throw error;
}


}