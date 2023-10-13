import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/supabase'
import BotoesEditarExcluir from './BotoesEditarExcluir'
import BotaoRedirecionarParaCadastro from './BotaoRedirecionarParaCadastro'

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
                <div key={index} className="flex flex-col bg-zinc-200 hover:shadow-2xl rounded-3xl px-5 py-5 border-2 border-black border-solid shadow-md">
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
                    <BotoesEditarExcluir cliente_id={data.cliente_id} />
                </div>
            )}
            {data?.length == 0 ? 
                <div className="flex flex-col bg-zinc-200 hover:shadow-2xl rounded-3xl px-5 py-5 border-2 border-black border-solid shadow-md">
                    <br />
                    <h1>Você não possui nenhum cliente cadastrado!</h1>
                    <br />
                    <BotaoRedirecionarParaCadastro />
                </div>
                 : ""}
        </div>
        <br />
    </div>

  )
}
