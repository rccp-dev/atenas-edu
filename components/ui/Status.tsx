import { statusMap } from "@/lib/ui/statusMap";

interface Props {
    status?: string | null;
}

export default function Status({ status }: Props) {
    const color = status ? statusMap[status] ?? "bg-neutral" : "bg-neutral";

    return (
        <span className={`inline-flex items-center gap-2 px-4 py-1 rounded-2xl text-sm font-semibold text-light ${color}`}>
            {status || "—"}
        </span>
    );
}