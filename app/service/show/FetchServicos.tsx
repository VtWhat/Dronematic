import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/supabase'
import BotoesEditarExcluirServ from './BotoesEditarExcluirServ'
import { object } from 'zod'

export default async function FetchServicos() {
  const supabase = createServerComponentClient<Database>({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const {
    data 
  } = await supabase.from('servicos').select('*, config!inner(*), clientes!inner(*)')

  if(data)
    console.log(Object.values(data))

  return (
    <div>
        <div className="space-y-4">
            {data?.map((data, index) => 
                <div key={index} className="flex flex-col bg-zinc-200 hover:shadow-2xl rounded-3xl px-5 py-5 border-2 border-black border-solid shadow-md">
                    <div className="text-center">Serviço {index + 1}</div>
                    <div className="m-0.5">
                        <label className="mr-2">
                            Categoria:
                        </label>
                        {data.categoria}
                    </div>
                    <div className="m-0.5">
                        <label className="mr-2">
                            Data:
                        </label>
                        {data.date}
                    </div>
                    <div className="m-0.5">
                        <label className="mr-2">
                            Descrição: 
                        </label>
                        {data.description}
                    </div>
                    <div className="m-0.5">
                        <label className="mr-2">
                            Nome: 
                        </label>
                        {data.clientes?.nome}
                    </div>
                    <div className="m-0.5">
                        <label className="mr-2">
                            Drone: 
                        </label>
                        {data.config.drone}
                    </div>
                    {/* <div className="m-0.5">
                        <label className="mr-2">
                            Camera: 
                        </label>
                        {data.config.camera}
                    </div> */}

                    {/* <BotoesEditarExcluirServ cliente_id={data.cliente_id} /> */}
                </div>
            )}
            {data?.length == 0 ? 
                <div className="flex flex-col bg-zinc-200 hover:shadow-2xl rounded-3xl px-5 py-5 border-2 border-black border-solid shadow-md">
                    <br />
                    <h1>Você não possui nenhum cliente cadastrado!</h1>
                    <br />
                    {/* <BotaoRedirecionarParaCadastro /> */}
                </div>
                 : null}
        </div>
        <br />
    </div>

  )
}
