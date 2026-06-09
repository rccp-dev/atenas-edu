import { statusMap } from "@/lib/ui/statusMap";

interface Props {
    status?: string | null;
}

export default function Status({ status }: Props) {

    const classes = status ? statusMap[status] ?? statusMap["Pendente"] : statusMap["Pendente"];

    return (
        <span className={`inline-flex items-center rounded-full border px-4 py-2 text-sm ${classes}`}>
            {status || "—"}
        </span>
    );
}