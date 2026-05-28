import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
};

export default function Form({ children, onSubmit }: Props) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      {children}
    </form>
  );
}