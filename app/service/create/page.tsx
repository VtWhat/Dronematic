import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import BackButton from '@/components/BackButton'
import NavBar from '@/components/NavBar'
import { Database } from '@/supabase'
import SelectCustomer from './SelectCustomer'
import BotaoRedirecionarParaCadastro from '@/app/customer/show/BotaoRedirecionarParaCadastro'

export default async function CadastrarServico() {
  const supabase = createServerComponentClient<Database>({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const {
    data,
  } = await supabase.from("clientes").select("cliente_id, nome, sobrenome, email")

  return (
    <div className="w-full flex flex-col items-center">
      <NavBar session={session}/>
        Selecione um cliente para cadastrar um serviço
        <BackButton />

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
                        Sobrenome:
                    </label>
                    {data.sobrenome}
                </div>
                <div className="m-0.5">
                    <label className="mr-2">
                        Email: 
                    </label>
                    {data.email}
                </div>
                <div className='text-center'>
                    <SelectCustomer cliente_id={data.cliente_id} /> 
                </div>
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
  )
}
