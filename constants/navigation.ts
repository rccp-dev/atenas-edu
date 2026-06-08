import {
    LayoutDashboard,
    GraduationCap,
    Users,
    ClipboardList,
    BookOpen,
    Upload,
} from "lucide-react";

import { ROUTES } from "./routes";

export const SIDEBAR_ITEMS = [
    {
        label: "Dashboard",
        href: ROUTES.DASHBOARD,
        icon: LayoutDashboard,
    },
    {
        label: "Turmas",
        href: ROUTES.CLASSROOMS,
        icon: Users,
    },
    {
        label: "Alunos",
        href: ROUTES.STUDENTS,
        icon: GraduationCap,
    },
    {
        label: "Atividades",
        href: ROUTES.ACTIVITIES,
        icon: ClipboardList,
    },
    {
        label: "Planos",
        href: ROUTES.LESSONPLANS,
        icon: BookOpen,
    },
    {
        label: "Envios",
        href: ROUTES.SUBMISSIONS,
        icon: Upload,
    },
];