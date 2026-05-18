import { Activity } from "@/types/activity";
import ActivityCard from "./ActivityCard";
import List from "@/components/ui/List";

interface Props {
    activities: Activity[];
}

export default function ActivityList({ activities }: Props) {
    return (
        <List>
            {activities.map((activity) => (
                <ActivityCard
                    key={activity.id}
                    activity={activity}
                />
            ))}
        </List>
    );
}