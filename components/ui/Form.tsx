"use client";

import { FormHTMLAttributes, ReactNode } from "react";

type Props =
    FormHTMLAttributes<HTMLFormElement> & {
        children: ReactNode;
    };

export default function Form({ children, className = "", ...props}: Props) {

    return (
        <form className={`flex flex-col gap-4 ${className}`} {...props}>
            {children}
        </form>
    );

}