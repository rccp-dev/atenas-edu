import { SelectHTMLAttributes } from "react";

type Props = SelectHTMLAttributes<HTMLSelectElement>;

export default function Select({
    className = "",
    children,
    ...props
}: Props) {
    return (
        <select
            {...props}
            className={`
                rounded-xl border border-border
                bg-light p-4 outline-none
                ${className}
            `}
        >
            {children}
        </select>
    );
}