import { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement>;

export default function Input({
    className = "",
    ...props
}: Props) {
    return (
        <input
            {...props}
            className={`
                rounded-xl border border-border
                bg-light p-4 outline-none
                ${className}
            `}
        />
    );
}