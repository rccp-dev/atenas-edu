import { LessonPlan } from "@/types/lessonPlan";
import {  
    createLessonPlanQuery,
    getLessonPlansQuery,
    getLessonPlanByIdQuery,
    updateLessonPlanQuery,
    deleteLessonPlanQuery
} from "@/queries/lessonPlan.query";

/* 
    Service respobnsável por integração futura com database
    e busca, criação, edição e remoção de planos de aula
*/

export async function createLessonPlan(
  data: Partial<LessonPlan>
) {
  const { data: lessonPlan, error } =
    await createLessonPlanQuery(data);
       
if (error) {
    throw error;
}

return lessonPlan;
}

export async function getLessonPlans(): Promise<LessonPlan[]> {

    /* Futuramente: Supabase, autenticação, filtros e pagnação */
   const { data, error } =
    await getLessonPlansQuery();
        
        

if (error) {
    throw error;
}

return data || [];
}

export async function getLessonPlanById(id: string): Promise<LessonPlan | undefined> {
        
    const { data, error } =
    await getLessonPlanByIdQuery(id);

if (error) {
    throw error;
}

return data;
}

export async function updateLessonPlan(id: string, data: Partial<LessonPlan>) {
    /* Futuramente: update no banco e validação de permissões */
    const { data: lessonPlan, error } =
    await updateLessonPlanQuery(
        id,
        data
    )
       

if (error) {
    throw error;
}

return lessonPlan;
}

export async function deleteLessonPlan(id: string) {
    /* Futuramente: soft delete no Supabase e verificação de permissão */
  const { error } =
    await deleteLessonPlanQuery(id)
        

if (error) {
    throw error;
}

}