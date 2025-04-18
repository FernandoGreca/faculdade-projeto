"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { EllipsisHorizontalIcon } from '@heroicons/react/24/solid'; // Importando o ícone

interface DropdownProps {
  nomeDisciplina: string;
  userType: 'professor' | 'aluno'; // Supondo que você tenha o tipo de usuário como 'professor' ou 'aluno'
}

export default function Dropdown({ nomeDisciplina, userType }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const irParaAtividades = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Verificando o tipo de usuário e criando a URL dinâmica
    const baseURL = userType === 'professor'
      ? '/dashboard-professor/disciplinas/atividades'
      : '/dashboard-aluno/disciplinas/atividades';

    router.push(`${baseURL}?disciplina=${encodeURIComponent(nomeDisciplina)}`);
    setOpen(false);
  };

  // Fechar Dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative z-[9999]" ref={dropdownRef}>
      <button
        className="p-2 cursor-pointer rounded-md hover:bg-[rgba(0,0,0,0.5)] duration-300"
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
      >
         <EllipsisHorizontalIcon className="w-6 h-6 text-white" />
      </button>

      {open && (
        <ul className="absolute text-sm mt-2 w-45 bg-white border rounded-md shadow-lg z-[9999]">
          <li>
            <button
              className="w-full text-left font-bold px-4 py-2 hover:bg-red-100 rounded-md text-red-500"
              onClick={(e) => e.stopPropagation()}
            >
              Cancelar Inscrição
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
