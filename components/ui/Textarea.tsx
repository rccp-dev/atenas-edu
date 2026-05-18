import { TextareaHTMLAttributes } from "react";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function Textarea({
    className = "",
    ...props
}: Props) {
    return (
        <textarea
            {...props}
            className={`
                rounded-xl border border-border
                bg-light p-4 outline-none
                ${className}
            `}
        />
    );
}