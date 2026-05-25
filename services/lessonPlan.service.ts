import { LessonPlan } from "@/types/lessonPlan";
import { supabase } from "@/lib/supabase";

/* 
    Service respobnsável por integração futura com database
    e busca, criação, edição e remoção de planos de aula
*/

export async function createLessonPlan(
  data: Partial<LessonPlan>
) {
  const { data: lessonPlan, error } =
    await supabase
        .from("lesson_plans")
        .insert(data)
        .select()
        .single();

if (error) {
    throw error;
}

return lessonPlan;
}

export async function getLessonPlans(): Promise<LessonPlan[]> {

    /* Futuramente: Supabase, autenticação, filtros e pagnação */
   const { data, error } =
    await supabase
        .from("lesson_plans")
        .select("*")
        

if (error) {
    throw error;
}

return data || [];
}

export async function getLessonPlanById(id: string): Promise<LessonPlan | undefined> {
        
    const { data, error } =
    await supabase
        .from("lesson_plans")
        .select("*")
        .eq("id", id)
        .single();

if (error) {
    throw error;
}

return data;
}

export async function updateLessonPlan(id: string, data: Partial<LessonPlan>) {
    /* Futuramente: update no banco e validação de permissões */
    const { data: lessonPlan, error } =
    await supabase
        .from("lesson_plans")
        .update(data)
        .eq("id", id)
        .select()
        .single();

if (error) {
    throw error;
}

return lessonPlan;
}

export async function deleteLessonPlan(id: string) {
    /* Futuramente: soft delete no Supabase e verificação de permissão */
  const { error } =
    await supabase
        .from("lesson_plans")
        .delete()
        .eq("id", id);

if (error) {
    throw error;
}

}