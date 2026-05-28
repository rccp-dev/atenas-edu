"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/services/auth.service";

import { Button } from "../ui/Button";

{/* Código necessitando de refatoração para usar components */}

export default function LoginForm() {

    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState("");

    async function handleLogin(
        event: React.FormEvent<HTMLFormElement>
    ) {

        event.preventDefault();

        setError("");
        setIsLoading(true);

        try {

            await login(email, password);
            router.push("/dashboard");

        } catch {

            setError("E-mail ou senha inválidos.");

        } finally {

            setIsLoading(false);

        }

    }

    return (
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">
                    E-mail
                </label>

                <input
                    type="email"
                    placeholder="Digite seu e-mail..."
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="rounded-lg border border-border bg-light px-4 py-3 outline-none"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">
                    Senha
                </label>

                <input
                    type="password"
                    placeholder="Digite sua senha..."
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="rounded-lg border border-border bg-light px-4 py-3 outline-none"
                />
            </div>

            {error && (
                <p className="text-sm text-red-500">{error}</p>
            )}

            <Button type="submit" disabled={isLoading}>
                {isLoading ? "Entrando..." : "Entrar"}
            </Button>
        </form>
    );
}