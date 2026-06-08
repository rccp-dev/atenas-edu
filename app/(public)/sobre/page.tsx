import Card from "@/components/ui/Card";

export default function AboutPage() {

    return (
        <main className="mx-auto w-full max-w-5xl px-6 py-16">

            <section className="mb-16">

                <p className="text-sm text-secondary">
                    Universidade de Ribeirão Preto • Engenharia de Software
                </p>

                <h1 className="mt-3 text-5xl font-bold text-primary">
                    Atenas Edu
                </h1>

                <p className="mt-6 max-w-3xl text-lg leading-relaxed text-foreground">
                    Plataforma acadêmica desenvolvida como projeto de
                    Prática Extensionista do curso de Engenharia de
                    Software da Universidade de Ribeirão Preto (UNAERP),
                    voltada para organização de turmas, alunos,
                    atividades, envios e planejamento pedagógico.
                </p>

            </section>

            <div className="grid gap-8">

                <Card>

                    <h2 className="text-2xl font-semibold text-primary">
                        Prática Extensionista
                    </h2>

                    <p className="mt-4 leading-relaxed text-foreground">
                        A extensão universitária aproxima a formação acadêmica das necessidades reais da sociedade,
                        permitindo que os estudantes desenvolvam soluções aplicadas a contextos concretos.
                    </p>

                    <p className="mt-4 leading-relaxed text-foreground">
                        O Atenas Edu surgiu dentro dessa proposta,
                        reunindo conhecimentos de engenharia de software,
                        banco de dados, arquitetura de sistemas,
                        desenvolvimento web e experiência do usuário.
                    </p>

                </Card>

                <Card>

                    <h2 className="text-2xl font-semibold text-primary">
                        O projeto
                    </h2>

                    <p className="mt-4 leading-relaxed text-foreground">
                        O objetivo da plataforma é oferecer um ambiente simples,
                        organizado e acessível para apoiar as atividades acadêmicas e pedagógicas.
                    </p>

                    <p className="mt-4 leading-relaxed text-foreground">
                        Informações normalmente distribuídas entre planilhas, documentos e mensagens passam a ficar centralizadas em uma única plataforma.
                    </p>

                </Card>

                <Card>

                    <h2 className="text-2xl font-semibold text-primary">
                        Principais funcionalidades
                    </h2>

                    <div className="mt-6 grid gap-4 md:grid-cols-2">

                        <div className="rounded-xl border border-border bg-background p-4">

                            <h3 className="text-lg font-medium text-secondary">
                                Gestão de turmas
                            </h3>

                            <p className="mt-2 text-foreground">
                                Organização de séries, turmas e informações complementares.
                            </p>

                        </div>

                        <div className="rounded-xl border border-border bg-background p-4">

                            <h3 className="text-lg font-medium text-secondary">
                                Cadastro de alunos
                            </h3>

                            <p className="mt-2 text-foreground">
                                Controle de matrícula e informações acadêmicas.
                            </p>

                        </div>

                        <div className="rounded-xl border border-border bg-background p-4">

                            <h3 className="text-lg font-medium text-secondary">
                                Atividades
                            </h3>

                            <p className="mt-2 text-foreground">
                                Criação, acompanhamento e correção de atividades.
                            </p>

                        </div>

                        <div className="rounded-xl border border-border bg-background p-4">

                            <h3 className="text-lg font-medium text-secondary">
                                Planos de aula
                            </h3>

                            <p className="mt-2 text-foreground">
                                Planejamento e organização dos conteúdos pedagógicos.
                            </p>

                        </div>

                    </div>

                </Card>

                <Card>

                    <h2 className="text-2xl font-semibold text-primary">
                        Tecnologias utilizadas
                    </h2>

                    <p className="mt-4 text-foreground">
                        O sistema foi desenvolvido utilizando tecnologias modernas para aplicações web.
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">

                        <span className="rounded-xl border border-border bg-background px-3 py-2 text-sm text-secondary">
                            Next.js
                        </span>

                        <span className="rounded-xl border border-border bg-background px-3 py-2 text-sm text-secondary">
                            React
                        </span>

                        <span className="rounded-xl border border-border bg-background px-3 py-2 text-sm text-secondary">
                            TypeScript
                        </span>

                        <span className="rounded-xl border border-border bg-background px-3 py-2 text-sm text-secondary">
                            Tailwind CSS
                        </span>

                        <span className="rounded-xl border border-border bg-background px-3 py-2 text-sm text-secondary">
                            Supabase
                        </span>

                    </div>

                </Card>

                <Card>

                    <h2 className="text-2xl font-semibold text-primary">
                        Créditos
                    </h2>

                    <p className="mt-4 text-foreground">
                        Projeto desenvolvido no contexto da Prática Extensionista do curso de Engenharia de Software da Universidade de Ribeirão Preto.
                    </p>

                    <div className="mt-6 grid gap-4 md:grid-cols-3">

                        <div className="rounded-xl border border-border bg-background p-4">

                            <h3 className="text-lg font-medium text-secondary">
                                Ricardo Custódio
                            </h3>

                            <p className="mt-2 text-foreground">
                                Arquitetura e desenvolvimento do sistema.
                            </p>

                        </div>

                        <div className="rounded-xl border border-border bg-background p-4">

                            <h3 className="text-lg font-medium text-secondary">
                                Gabriel Barbosa
                            </h3>

                            <p className="mt-2 text-foreground">
                                Desenvolvimento e apoio técnico.
                            </p>

                        </div>

                        <div className="rounded-xl border border-border bg-background p-4">

                            <h3 className="text-lg font-medium text-secondary">
                                Júlia Loraine
                            </h3>

                            <p className="mt-2 text-foreground">
                                Design, front-end e pesquisa.
                            </p>

                        </div>

                    </div>

                </Card>

            </div>
        </main>
    );
}