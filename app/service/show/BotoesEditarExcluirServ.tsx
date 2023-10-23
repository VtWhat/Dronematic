"use client"

import { Database } from "@/supabase"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function EditAndDeleteButton(data: { servico_id: any }) {
    const supabase = createClientComponentClient<Database>()
    const router = useRouter()

    const [lat, setLat] = useState<number>();
    const [long, setLong] = useState<number>();


    useEffect(() => {
        if('geolocation' in navigator) {
            // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
            navigator.geolocation.getCurrentPosition(({ coords }) => {
                const { latitude, longitude } = coords;
                setLat(latitude);
                setLong(longitude)
            })
        }
    }, []);

    const handleDelete = async (id: any) => {
        const res = await supabase.from("servicos").delete().eq("servico_id", id)
        toast.success("Serviço excluido!")
        router.refresh()
      }

    const [cidade, setCidade] = useState<string>("")
    const [estado, setEstado] = useState<string>("")
    const [bairro, setBairro] = useState<string>("")
    const [rua, setRua] = useState<string>("")
    const [numero, setNumero] = useState<string>("")
    const [cep, setCep] = useState<string>("")

    const getLocation = async (id: any) => {
        const { data } = await supabase.from("servicos").select().eq("servico_id", id).single()

        if ( data ){
            setCidade(data.cidade)
            setEstado(data.estado)
            setBairro(data.bairro)
            setRua(data.rua)
            setNumero(data.numero)
            setCep(data.cep)
        }
      }

    getLocation(data.servico_id)

    return (
        <div className="space-y-2 space-x-2 text-right">
            <button 
                className="bg-black hover:bg-green-900 text-white rounded-full w-36"
                onClick={() => {window.open("https://www.google.com/maps?q="+rua+","+numero+","+bairro+","+cidade+","+estado+","+cep )}}
                >Abrir no Mapa
            </button>

            <button 
                className="bg-black hover:bg-green-900 text-white rounded-full w-24"
                onClick={() => {window.open("https://www.google.com/maps/dir/"+lat+","+long+"/"+rua+","+numero+","+bairro+","+cidade+","+estado+","+cep )}}
                >Traçar Rota
            </button>

            <Link
                href={{
                    pathname: '/service/update',
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
                  <p>Você tem certeza que deseja excluir esse serviço?</p>
                    <div className="text-center space-x-1">
                        <button 
                            className="bg-red-700 hover:bg-red-900 text-white rounded-full w-24" 
                            onClick={() => {handleDelete(data.servico_id),toast.dismiss(t.id="1"), toast.dismiss(t.id="2")}}>
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
              toast("As configurações para esse serviço também serão excluidas!", {id:"2", duration: 12000, icon:"⚠"})}}
                >Excluir
            </button>

        </div>
    )
  }