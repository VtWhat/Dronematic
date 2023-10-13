"use client"

import { useRouter } from "next/navigation"

export default function BotaoRedirecionarParaCadastro() {
    const router = useRouter()

    return (
        <button 
            className="py-2 px-4 rounded-md no-underline bg-black hover:bg-green-900 text-white text-center"
            onClick={() =>router.push("/cadastro/cliente")}
        >Cadastrar Clientes
        </button>
    )
  }