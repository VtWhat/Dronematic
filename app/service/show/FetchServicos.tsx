// @ts-nocheck
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/supabase'
import Botoes from './Botoes'

export default async function FetchServicos() {
  const supabase = createServerComponentClient<Database>({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const {
    data 
  } = await supabase.from('servicos').select('*, config(*), clientes(*)')

  return (
    <div>
        <div className="space-y-4">
            {data?.map((data, index) => 
                <div key={index} className="flex flex-col bg-zinc-200 hover:shadow-2xl rounded-3xl px-5 py-5 border-2 border-black border-solid shadow-md">
                    <div className="text-center">{data.clientes?.nome + " " + data.clientes?.sobrenome +" - " + data.categoria}
                    <br/>
                    {data.clientes?.email + " - " + data.clientes?.telefone_1}
                    <br/>
                    {data.date.substring(0, 10)}
                    </div>
                    <div className="m-0.5">
                        <label className="mr-2">
                            Descrição: 
                        </label>
                        {data.description}
                    </div>
                    <div className="m-0.5">
                        <label className="mr-2">
                            Local: 
                        </label>
                        {data.rua + ", " + data.numero + ", " + data.bairro + ", " + data.cidade + ", " + data.estado}
                    </div>
                    <div className="m-0.5">
                        <label className="mr-2">
                            Drone: 
                        </label>
                        {data.config.drone}
                    </div>
                    <div className="m-0.5">
                        <label className="mr-2">
                            Camera: 
                        </label>
                        {data.config.camera}
                    </div>

                    <Botoes servico_id={data.servico_id} u_email={session?.user.email} />
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
