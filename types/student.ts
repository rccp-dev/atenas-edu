export interface Student {
    id: string;
    nome: string;
    matricula: string;
    conteudo?: string;
    classroomId: string;
    createdAt: string;
    updatedAt?: string;
    isDraft: boolean;
}