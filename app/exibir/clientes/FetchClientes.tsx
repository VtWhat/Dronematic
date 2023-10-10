import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/supabase'

export default async function FetchClientes() {
  const supabase = createServerComponentClient<Database>({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const {
    data,
  } = await supabase.from("clientes").select("*")

  return (
    <div>
        <div className="space-y-4">
            {data?.map((data, index) => 
                <div key={index} className="flex flex-col bg-zinc-200 hover:bg-green-500 rounded-3xl px-5 py-5 border-2 border-black border-solid shadow-md">
                    <div className="text-center">Cliente {index + 1}</div>
                    <div className="m-0.5">
                        <label className="mr-2">
                            Nome:
                        </label>
                        {data.nome}
                    </div>
                    <div className="m-0.5">
                        <label className="mr-2">
                            Email: 
                        </label>
                        {data.email}
                    </div>
                    <div className="m-0.5">
                        <label className="mr-2">
                            Telefone: 
                        </label>
                        {data.telefone}
                    </div>
                    <div className="space-y-2 space-x-2 text-right">
                        <button className="bg-black text-white rounded-full w-24">Editar</button>
                        <button className="bg-black text-white rounded-full w-24">Excluir</button>
                    </div>
                </div>
            )}
        </div>
        <br />
        <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>

  )
}
