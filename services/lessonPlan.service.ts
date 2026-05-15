import { lessonPlansMock } from "@/mocks/lessonPlans.mock";
import { LessonPlan } from "@/types/lessonPlan";

/* 
    Service respobnsável por integração futura com database
    e busca, criação, edição e remoção de planos de aula
*/

export async function createLessonPlan(
  data: Partial<LessonPlan>
) {
  console.log("CREATE:", data);
}

export async function getLessonPlans(): Promise<LessonPlan[]> {

    /* Futuramente: Supabase, autenticação, filtros e pagnação */
    return lessonPlansMock;
}

export async function getLessonPlanById(id: string): Promise<LessonPlan | undefined> {
        
    console.log(id);
    console.log(lessonPlansMock);
    
    return lessonPlansMock.find(
        (plan) => plan.id === id
    );
}

export async function updateLessonPlan(id: string, data: Partial<LessonPlan>) {
    /* Futuramente: update no banco e validação de permissões */
    console.log("UPDATE:", id, data);
}

export async function deleteLessonPlan(id: string) {
    /* Futuramente: soft delete no Supabase e verificação de permissão */
    console.log("DELETE:", id);
}