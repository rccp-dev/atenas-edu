import {
    Users,
    GraduationCap,
    ClipboardList,
    Upload,
} from "lucide-react";

import { getUser } from "@/lib/auth/auth";

import {
    getDashboardStats,
    getUpcomingActivities,
} from "@/queries/dashboard.query";

import { serverClient } from "@/lib/supabase/server";

import StatCard from "@/components/dashboard/StatCard";
import UpcomingActivities from "@/components/dashboard/UpcomingActivities";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {

    const supabase = await serverClient();
    const user = await getUser();

    const [
        stats,
        upcomingActivities,
    ] = await Promise.all([
        getDashboardStats(supabase),
        getUpcomingActivities(supabase),
    ]);

    const statCards = [
        {
            label: "Turmas",
            value: stats.classrooms,
            icon: Users,
        },
        {
            label: "Alunos",
            value: stats.students,
            icon: GraduationCap,
        },
        {
            label: "Atividades",
            value: stats.activities,
            icon: ClipboardList,
        },
        {
            label: "Envios",
            value: stats.submissions,
            icon: Upload,
        },
    ];

    return (
        <div className="px-8 py-10">

            <header className="mb-10">

                <h1 className="text-4xl font-bold text-primary">
                    Dashboard
                </h1>

                <p className="mt-2 text-secondary">
                    Bem-vindo de volta,{" "}
                    {user?.user_metadata?.name || user?.email || "Usuário"}
                </p>

            </header>

            <section className="mb-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">

                {statCards.map((card) => (
                    <StatCard key={card.label} {...card}/>
                ))}

            </section>

            <UpcomingActivities activities={upcomingActivities}/>

        </div>
    );
}