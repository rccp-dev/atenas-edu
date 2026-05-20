import { Submission } from "@/types/submission";
import SubmissionCard from "./SubmissionCard";
import List from "@/components/ui/List";

interface Props {
    submissions: Submission[];
}

export default function SubmissionList({ submissions }: Props) {
    return (
        <List>
            {submissions.map((submission) => (
                <SubmissionCard key={submission.id} submission={submission}/>
            ))}
        </List>
    );
}