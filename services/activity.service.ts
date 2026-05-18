import { Activity } from "@/types/activity";
import { activitiesMock } from "@/mocks/activities.mock";

export async function createActivity(data: Partial<Activity>) {
  console.log("CREATE:", data);
}

export async function getActivities(): Promise<Activity[]> {
  return activitiesMock;
}

export async function getActivityById(id: string) {
  return activitiesMock.find((activity) => activity.id === id);
}

export async function getActivityByToken(token: string) {
    return activitiesMock.find(
        (a) => a.token === token
    );
}

export function getActivityStatus(
    activity: Activity
) {

    if (
        activity.status?.includes("Entregue")
    ) {
        return "Entregue";
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
  console.log("UPDATE:", id, data);
}

export async function deleteActivity(id: string) {
  console.log("DELETE:", id);
}