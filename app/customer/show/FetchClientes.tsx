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
                    <div className="m-0.5">
                        <label className="mr-2">
                            Telefone 1: 
                        </label>
                        {data.telefone_1}
                    </div>
                    <div className="m-0.5">
                        <label className="mr-2">
                            Telefone 2: 
                        </label>
                        {data.telefone_2}
                    </div>
                    <div className="m-0.5">
                        <label className="mr-2">
                            CPF: 
                        </label>
                        {data.cpf}
                    </div>
                    <div className="m-0.5">
                        <label className="mr-2">
                            Cidade: 
                        </label>
                        {data.cidade}
                    </div>
                    <div className="m-0.5">
                        <label className="mr-2">
                            Estado: 
                        </label>
                        {data.estado}
                    </div>
                    <div className="m-0.5">
                        <label className="mr-2">
                            Bairro: 
                        </label>
                        {data.bairro}
                    </div>
                    <div className="m-0.5">
                        <label className="mr-2">
                            Rua: 
                        </label>
                        {data.rua}
                    </div>
                    <div className="m-0.5">
                        <label className="mr-2">
                            Numero: 
                        </label>
                        {data.numero}
                    </div>
                    <div className="m-0.5">
                        <label className="mr-2">
                            CEP: 
                        </label>
                        {data.cep}
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
