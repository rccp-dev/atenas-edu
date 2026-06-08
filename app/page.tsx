import Link from "next/link";

import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

import { ROUTES } from "@/constants/routes";

export default function HomePage() {

    return (
        <main className="flex min-h-screen justify-center px-6 py-20">

            <section className="w-full max-w-5xl">

                <Card className="rounded-3xl p-12">

                    <div className="max-w-3xl">
                        <Badge>
                            Plataforma acadêmica
                        </Badge>

                        <h1 className="mt-6 text-6xl font-bold text-primary">
                            Atenas Edu
                        </h1>

                        <p className="mt-6 text-xl leading-relaxed text-foreground">
                            Uma plataforma para organizar turmas,
                            acompanhar alunos, gerenciar atividades,
                            registrar envios e estruturar planos de
                            aula em um único ambiente.
                        </p>

                    </div>

                    <div className="mt-10 flex gap-3">

                        <Link
                            href={ROUTES.LOGIN}
                            className="rounded-xl bg-primary px-6 py-3 font-medium text-light"
                        >
                            Entrar
                        </Link>

                        <Link
                            href={ROUTES.ABOUT}
                            className="rounded-xl border border-border bg-background px-6 py-3 font-medium text-foreground"
                        >
                            Saiba mais
                        </Link>

                    </div>

                    <section className="mt-14">

                        <h2 className="mb-5 text-2xl font-semibold text-primary">
                            Principais funcionalidades
                        </h2>

                        <div className="grid gap-4 md:grid-cols-3">

                            <Card className="bg-background">

                                <h3 className="text-lg font-medium text-foreground">
                                    Turmas e alunos
                                </h3>

                                <p className="mt-2 text-foreground">
                                    Organize turmas e mantenha
                                    informações centralizadas.
                                </p>

                            </Card>

                            <Card className="bg-background">

                                <h3 className="text-lg font-medium text-foreground">
                                    Atividades e envios
                                </h3>

                                <p className="mt-2 text-foreground">
                                    Acompanhe entregas e correções.
                                </p>

                            </Card>

                            <Card className="bg-background">

                                <h3 className="text-lg font-medium text-foreground">
                                    Planos de aula
                                </h3>

                                <p className="mt-2 text-foreground">
                                    Organize o planejamento pedagógico.
                                </p>

                            </Card>
                            
                        </div>
                    </section>
                </Card>
            </section>
        </main>
    );
}