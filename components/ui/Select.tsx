import { ChevronDown } from "lucide-react";

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export default function Select({ children, className = "", ...props }: Props) {
    return (
        <div className="relative">
            <select
                {...props}
                className={`
                    w-full appearance-none rounded-xl border border-border
                    bg-input px-4 py-3 pr-10 text-foreground
                    outline-none transition
                    focus:border-primary
                    ${className}
                `}
            >
                {children}
            </select>

            <ChevronDown
                size={18}
                strokeWidth={1.8}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-primary"
            />
        </div>
    );
}