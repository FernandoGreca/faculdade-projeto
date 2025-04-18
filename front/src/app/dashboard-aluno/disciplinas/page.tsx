"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Card from "@/app/ui/dashboard/cards";
import IngressarDisciplina from "@/app/ui/dashboard/ingressar-disciplina";

export default function Dashboard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [disciplinas, setDisciplinas] = useState<any[]>([]);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const storedRole = sessionStorage.getItem("role");

    if (!token) {
      router.push("/login");
      return;
    }

    setRole(storedRole);

    const user = sessionStorage.getItem("User");
    if (user) {
      const parsedUser = JSON.parse(user);
      if (parsedUser && parsedUser.disciplinas) {
        setDisciplinas(parsedUser.disciplinas);
      } else {
        setDisciplinas([]);
      }
    }

    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <p>Carregando...</p>;
  }


  const coresDisponiveis = ["blue", "purple", "gray"];

  // Função para embaralhar o array
  const embaralharCores = (array: string[]) => {
    return [...array].sort(() => Math.random() - 0.5);
  };
  const coresEmbaralhadas = embaralharCores(coresDisponiveis);

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">
          {role === "professor" ? "Minhas Disciplinas" : "Disciplinas Matriculadas"}
        </h2>
        {role === "aluno" && (
          <div className="w-80">
            <IngressarDisciplina />
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-8">
        {disciplinas.length > 0 ? (
          disciplinas.map((disciplina: any, index: number) => {
            // Se tiver mais disciplinas do que cores, reinicia o índice
            const cor = coresEmbaralhadas[index % coresEmbaralhadas.length];

            return (
              <Card
                key={disciplina._id}
                nomeDisciplina={disciplina.nome}
                fotoPerfil={undefined}
                nomeProfessor={disciplina.professores ? disciplina.professores[0] : "Professor Desconhecido"}
                buttonBgColor={cor}
                buttonBgColorHover={cor}
                codigoDisciplina={disciplina.codigo_disciplina}
              />
            );
          })
        ) : (
          <p>Não há disciplinas disponíveis.</p>
        )}
      </div>
    </>
  );
}
