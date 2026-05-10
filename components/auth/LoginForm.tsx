"use client";

import { useState } from "react";
import { Button } from "../ui/button";

export default function LoginForm() {

    // useState retorna um array:
    // [valor_atual, funcao_para_atualizar]
    // useState(""); cria um estado React com valor inicial vazio ("")

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleLogin(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        setIsLoading(true);

        // Futuramente: await login(email, password)
        // Temporário:

        try { 
            await new Promise(
                (resolve) => setTimeout(resolve, 1500)
            );

            console.log({
                email,
                password,
            });

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

                <input type="email" placeholder="Digite seu e-mail..." value={email} 
                    onChange={(event) => setEmail(event.target.value)}
                    className="rounded-lg border border-border bg-light px-4 py-3 outline-none"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">
                    Senha
                </label>

                <input type="password" placeholder="Digite sua senha..." value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="rounded-lg border border-border bg-light px-4 py-3 outline-none"
                />
            </div>

            <Button type="submit" disabled={isLoading}>
                {isLoading ? "Entrando..." : "Entrar"}
            </Button>
        </form>
    )
}