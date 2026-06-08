import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function List({ children }: Props) {
  return (
    <div className="grid gap-4 mt-6">
      {children}
    </div>
  );
}
