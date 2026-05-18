import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function Card({ children, className = "" }: Props) {
  return (
    <div
      className={`rounded-xl border border-border bg-background p-5 transition hover:bg-white ${className}`}
    >
      {children}
    </div>
  );
}