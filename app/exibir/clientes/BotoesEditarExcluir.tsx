"use client"

import { Database } from "@/supabase"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import Link from "next/link"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export default function EditAndDeleteButton(data: { cliente_id: any }) {
    const supabase = createClientComponentClient<Database>()
    const router = useRouter()

    const handleDelete = async (id: any) => {
        const res = await supabase.from("clientes").delete().eq("cliente_id", id)
        toast.success("Cliente excluido!")
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
                    onClick={() => toast.loading("Carregando dados", {id:"upCliToast"})}
                    >Editar
                </button>
            </Link>

            <button 
            className="bg-black hover:bg-green-900 text-white rounded-full w-24"
            onClick={() => {toast((t) => (
                <div className="flex flex-col gap-3">
                  <p>Você tem certeza que deseja excluir esse cliente?</p>
                    <div className="text-center space-x-1">
                        <button 
                            className="bg-red-700 hover:bg-red-900 text-white rounded-full w-24" 
                            onClick={() => {handleDelete(data.cliente_id),toast.dismiss(t.id="1"), toast.dismiss(t.id="2")}}>
                            Excluir
                        </button>
                        <button 
                            className="bg-black hover:bg-green-900 text-white rounded-full w-24"
                            onClick={() => {toast.dismiss(t.id="1"), toast.dismiss(t.id="2")}}>
                            Cancelar
                        </button>
                    </div>
                </div>
              ), {id:"1",duration: 12000, icon:'⚠'}),
              toast("Todos os serviços cadastrados para esse cliente também serão excluidos.", {id:"2", duration: 12000, icon:"⚠"})}}
                >Excluir
            </button>
        </div>
    )
  }