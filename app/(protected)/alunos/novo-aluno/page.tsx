import StudentForm from '@/components/aluno/StudentForm'

export default function NewStudentPage() {
  return (
    <main className="flex justify-center items-center min-h-screen px-4 py-10">
      <section className="w-full max-w-4xl rounded-2xl border border-border 
										      bg-surface p-8 shadow-sm">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Criar aluno
          </h1>

          <p className="mt-2 text-secondary">
            Cadastre um novo aluno na plataforma.
          </p>
        </div>

        <StudentForm />
      </section>
    </main>
  );
}