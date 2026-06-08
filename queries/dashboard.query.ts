import { SupabaseClient } from "@supabase/supabase-js";

import { getClassroomById, getClassroomDisplayName } from "@/services/classroom.service";

export async function getDashboardStats(
    supabase: SupabaseClient
) {

    const [
        classrooms,
        students,
        activities,
        submissions,
    ] = await Promise.all([

        supabase
            .from("classrooms")
            .select("*", {
                count: "exact",
                head: true,
            }),

        supabase
            .from("students")
            .select("*", {
                count: "exact",
                head: true,
            }),

        supabase
            .from("activities")
            .select("*", {
                count: "exact",
                head: true,
            }),

        supabase
            .from("submissions")
            .select("*", {
                count: "exact",
                head: true,
            }),

    ]);

    return {
        classrooms: classrooms.count ?? 0,
        students: students.count ?? 0,
        activities: activities.count ?? 0,
        submissions: submissions.count ?? 0,
    };

}

export async function getUpcomingActivities(
    supabase: SupabaseClient
) {

    const today = new Date().toISOString();

    const { data, error } = await supabase
        .from("activities")
        .select(`
            id,
            title,
            deadline,
            classroom_id
        `)
        .gte("deadline", today)
        .order("deadline", {
            ascending: true,
        })
        .limit(5);

    if (error) {
        throw new Error(error.message);
    }

    const activities = await Promise.all(

        (data ?? []).map(async (activity) => {

            let classroomName = "Sem turma";

            if (activity.classroom_id) {

                const classroom =
                    await getClassroomById(
                        supabase,
                        activity.classroom_id
                    );

                if (classroom) {
                    classroomName =
                        await getClassroomDisplayName(
                            classroom
                        );
                }

            }

            return {
                id: activity.id,
                title: activity.title,
                deadline: activity.deadline,
                classroomName,
            };

        })

    );

    return activities;

}