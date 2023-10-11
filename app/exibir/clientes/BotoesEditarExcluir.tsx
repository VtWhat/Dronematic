"use client"

import { Database } from "@/supabase"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function EditAndDeleteButton(data: { cliente_id: any }) {
    const supabase = createClientComponentClient<Database>()
    const router = useRouter()

    const handleDelete = async (id: any) => {
        const res = await supabase.from("clientes").delete().eq("cliente_id", id)
        router.refresh()
      }

    return (
        <div className="space-y-2 space-x-2 text-right">
            <Link
                href={{
                    pathname: '/cadastro/update',
                    query: data
                }}
                >
                <button 
                    className="bg-black hover:bg-green-900 text-white rounded-full w-24"
                    //onClick={() => handleUpdate(data.cliente_id)}
                    >Editar
                </button>
            </Link>

            <button 
            className="bg-black hover:bg-green-900 text-white rounded-full w-24"
            onClick={() => confirm("Você tem certeza que deseja excluir esse cliente? Todos os serviços cadastrados para esse cliente também serão excluidos.") ? handleDelete(data.cliente_id) : ""}
                >Excluir
            </button>
        </div>
    )
  }