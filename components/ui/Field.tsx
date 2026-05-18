import { ReactNode } from "react";

type Props = {
    label?: string;
    children: ReactNode;
};

export default function Field({
    label,
    children,
}: Props) {
    return (
        <div className="flex flex-col gap-2">
            {label && (
                <span className="text-xl text-secondary">
                    {label}
                </span>
            )}

            {children}
        </div>
    );
}