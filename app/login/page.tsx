import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
    return (
        <main className="flex min-h-screen items-center justify-center px-4 bg-background">

            <section className="w-full max-w-md rounded-2xl border border-border bg-surface p-8 shadow-sm">

                <div className="mb-8">

                    <h1 className="text-3xl font-bold text-primary">
                        Atenas
                    </h1>

                    <p className="text-sm text-secondary mt-1">
                        Plataforma acadêmica
                    </p>

                </div>

                <LoginForm />

            </section>

        </main>
    );
}