interface Props {
    children: React.ReactNode;
    variant?: "default" | "primary" | "secondary" | "success" | "danger";
}

const variants = {
    default: "border-border bg-background text-secondary",
    primary: "border-primary/20 bg-primary/10 text-primary",
    secondary: "border-secondary/20 bg-secondary/10 text-secondary",
    success: "border-success/20 bg-success/10 text-success",
    danger: "border-danger/20 bg-danger/10 text-danger",
};

export default function Badge({ children, variant = "default" }: Props) {
    return (
        <span
            className={`inline-flex items-center rounded-full border px-4 py-2 text-sm ${variants[variant]}`}
        >
            {children}
        </span>
    );
}