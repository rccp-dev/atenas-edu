import { Button } from "@/components/ui/Button";

interface Props {
    open: boolean;
    title: string;
    description: string;
    variant?: "default" | "warning" | "danger";
    onConfirm: () => void;
    onCancel: () => void;
}

export default function Confirm({
    open,
    title,
    description,
    variant = "default",
    onConfirm,
    onCancel,
}: Props) {

    if (!open) {
        return null;
    }

    const confirmVariant = {
        default: "primary",
        warning: "warning",
        danger: "danger",
    } as const;

    return (
        <div>
            <h2>{title}</h2>

            <p>{description}</p>

            <div className="flex gap-2">
                <Button variant="secondary" onClick={onCancel}>
                    Cancelar
                </Button>

                <Button variant={confirmVariant[variant]} onClick={onConfirm}>
                    Confirmar
                </Button>
            </div>
        </div>
    );
}