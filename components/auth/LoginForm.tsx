"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/services/auth.service";

import Input from "../ui/Input";
import Form from "../ui/Form";
import { Button } from "@/components/ui/Button";

import { success } from "@/lib/ui/toast";

export default function LoginForm() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setError("");
        setLoading(true);

        try {
            await login(email, password);
            success("Bem vindo de volta!");
            router.replace("/dashboard");
        } catch {
            setError("E-mail ou senha inválidos.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Form onSubmit={handleLogin} className="space-y-5">

            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-foreground">
                    E-mail
                </label>

                <Input
                    type="email"
                    placeholder="Digite seu e-mail..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-foreground">
                    Senha
                </label>

                <Input
                    type="password"
                    placeholder="Digite sua senha..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            {error && (
                <p className="text-sm text-danger">
                    {error}
                </p>
            )}

            <Button type="submit" disabled={loading}>
                {loading ? "Entrando..." : "Entrar"}
            </Button>

        </Form>
    );
}