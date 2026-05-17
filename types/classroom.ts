export interface Classroom {
    id: string;
    nome: string;
    ano: number;
    identificador: string;
    descricao?: string;
    createdAt: string;
    updatedAt?: string;
    isDraft: boolean;
}