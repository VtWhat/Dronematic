"use client"

import { Database } from "@/supabase"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"

export default function LogoutButton(data: { cliente_id: any }) {
    const supabase = createClientComponentClient<Database>()
    const router = useRouter()

    const handleDelete = async (id: any) => {
        const res = await supabase.from("clientes").delete().eq("cliente_id", id)
        router.refresh()
      }

    return (
        <div className="space-y-2 space-x-2 text-right">
            <button 
            className="bg-black text-white rounded-full w-24"
                >Editar
            </button>

            <button 
            className="bg-black text-white rounded-full w-24"
            onClick={() => confirm("Você tem certeza que deseja excluir esse cliente? Todos os serviços cadastrados para esse cliente também serão excluidos.") ? handleDelete(data.cliente_id) : ""}
                >Excluir
            </button>
        </div>
    )
  }