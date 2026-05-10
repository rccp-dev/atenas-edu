import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
    return(
        <main className="flex justify-center items-center min-h-screen px-4">
            <section className="w-full max-w-md rounded-2xl 
                                border border-border bg-surface p-8 shadow-sm">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground">
                        Atenas
                    </h1>

                    <p className="text-secondary">
                        Plataforma acadêmica
                    </p>
                </div>

                <LoginForm />
            </section>
        </main>
    )
}