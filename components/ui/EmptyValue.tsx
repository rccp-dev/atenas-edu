interface Props {
    value?: string | null;
    fallback?: string;
}

export default function EmptyValue({ value, fallback = "Vazio" }: Props) {
    if (!value || value.trim() === "") {
        return <span className="text-muted-foreground">{fallback}</span>;
    }

    return <span>{value}</span>;
}