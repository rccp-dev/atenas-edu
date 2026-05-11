import LessonPlanForm from '@/components/plano/LessonPlanForm'

export default function NewLessonPlanPage() {
    return (
        <main className="flex justify-center items-center min-h-screen px-4">
            <section className="w-full mx-50 my-10 rounded-2xl 
                                border border-border bg-surface p-8 shadow-sm">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground">
                        Criar novo plano de aula
                    </h1>
                </div>

                <LessonPlanForm />
            </section>
        </main>
    )
}