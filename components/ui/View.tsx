import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function View({ children }: Props) {
  return (
    <main className="flex justify-center items-center min-h-screen px-4 py-10">
      <section className="w-full max-w-4xl rounded-2xl border border-border bg-surface p-8 shadow-sm">
        {children}
      </section>
    </main>
  );
}