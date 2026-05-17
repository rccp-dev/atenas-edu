'use client';

import { useState } from "react";
import { Button } from "../ui/Button";

export default function ClassroomForm() {

    const [ano, setAno] = useState("");
    const [identificador, setIdentificador] = useState("");
    const [descricao, setDescricao] = useState("");

    async function handleSubmit() {
        console.log({
            ano,
            identificador,
            descricao,
        });
    }

    return (
        <div className="flex flex-col gap-4">
            {/* Nome da turma tem que ser criado automaticamente a partir do ano e do identificador */}
            
            <input value={ano} placeholder="Ano" className="rounded-xl border border-border bg-light p-4 outline-none"
                onChange={(e) =>
                    setAno(e.target.value)
                }
            />

            <input value={identificador} placeholder="Série" className="rounded-xl border border-border bg-light p-4 outline-none"
                onChange={(e) =>
                    setIdentificador(e.target.value)
                }
            />

            <textarea value={descricao} placeholder="Descrição..." className="min-h-40 rounded-xl border border-border bg-light p-4 outline-none"
                onChange={(e) =>
                    setDescricao(e.target.value)
                }
            />

            <div className="w-24">
                <Button type="submit" onClick={handleSubmit}>Salvar</Button>
            </div>
        </div>
    );
}