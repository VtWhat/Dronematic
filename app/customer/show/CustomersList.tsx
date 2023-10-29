'use client'

import toast from 'react-hot-toast'
import Link from 'next/link'
import { Card, CardBody, CardHeader, Image, Button, Divider } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/supabase'

interface Cliente {
  bairro: string
  cep: string
  cidade: string
  cliente_id: number
  cpf: string
  email: string
  estado: string
  inserted_at: string
  nome: string
  numero: string
  rua: string
  sobrenome: string
  telefone_1: string
  telefone_2: string | null
  updated_at: string | null
  user_id: string | null
}

export default function CustomerList({ clientes }: { clientes: Cliente[] | null}) {
  const supabase = createClientComponentClient<Database>()

  const router = useRouter()

  const handleDelete = async (id: any) => {
    const res = await supabase.from("clientes").delete().eq("cliente_id", id)
    toast.success("Cliente excluido!")
    router.refresh()
  }

  return (
    <div className='w-full flex justify-center items-center'>
      {clientes?.length != 0 ?
        <div className="grid grid-cols-3 gap-4 py-10">
          {clientes?.map((cliente) => 
            <Card className="p-4 w-64" isPressable >
                <CardHeader className="flex flex-col items-start truncate">
                  <h4 className="font-bold text-large text-black">{cliente.nome + " " + cliente.sobrenome}</h4>
                  <p className='text-black text-small'>
                      {cliente.email}
                  </p>
                  <p className='text-black text-small'>
                      {cliente.telefone_1}
                  </p>
                  <p className='text-black text-small'>
                      {cliente.rua}
                  </p>
                  <p className='text-black text-small'>
                      {cliente.bairro}, {cliente.numero}
                  </p>
                  <p className='text-black text-small'>
                      {cliente.cep}
                  </p>
                  <p className='text-black text-small'>
                      {cliente.cidade}-{cliente.estado}
                  </p>
                </CardHeader>
                <Divider className='mb-4'/>
                  <div className='w-full'>
                    <Link href={{pathname: '/customer/update', query: clientes ? "cliente_id=" + (cliente.cliente_id).toString() : ""}}>
                      <Button variant='shadow' color='primary' className='mx-2'
                          onClick={() => toast.loading("Carregando dados", {id:"upCliToast"})}
                          >Editar
                      </Button>
                    </Link>
                    <Button variant='shadow' color='danger' className='mx-2'
                    onClick={() => {toast((t) => (
                        <div className="flex flex-col gap-3">
                          <p>Você tem certeza que deseja excluir esse cliente?</p>
                            <div className="text-center space-x-1">
                                <Button variant='shadow' color='danger' className='mx-2'
                                    onClick={() => {handleDelete(cliente.cliente_id),toast.dismiss(t.id="1"), toast.dismiss(t.id="2")}}>
                                    Excluir
                                </Button>
                                <Button variant='shadow' color='primary' className='mx-2'
                                    onClick={() => {toast.dismiss(t.id="1"), toast.dismiss(t.id="2")}}>
                                    Cancelar
                                </Button>
                            </div>
                        </div>
                      ), {id:"1",duration: 12000, icon:'⚠'}),
                      toast("Todos os serviços cadastrados para esse cliente também serão excluidos.", {id:"2", duration: 12000, icon:"⚠"})}}
                        >Excluir
                    </Button>
                  </div>
            </Card>
          )}
        </div>
       : "" }
    </div>





    // <div>
    //     <div className="space-y-4">
    //         {data?.map((data, index) => 
    //             <div key={index} className="flex flex-col bg-zinc-200 hover:shadow-2xl rounded-3xl px-5 py-5 border-2 border-black border-solid shadow-md">
    //                 <div className="text-center">Cliente {index + 1}</div>
    //                 <div className="m-0.5">
    //                     <label className="mr-2">
    //                         Nome:
    //                     </label>
    //                     {data.nome}
    //                 </div>
    //                 <div className="m-0.5">
    //                     <label className="mr-2">
    //                         Sobrenome:
    //                     </label>
    //                     {data.sobrenome}
    //                 </div>
    //                 <div className="m-0.5">
    //                     <label className="mr-2">
    //                         Email: 
    //                     </label>
    //                     {data.email}
    //                 </div>
    //                 <div className="m-0.5">
    //                     <label className="mr-2">
    //                         Telefone 1: 
    //                     </label>
    //                     {data.telefone_1}
    //                 </div>
    //                 <div className="m-0.5">
    //                     <label className="mr-2">
    //                         Telefone 2: 
    //                     </label>
    //                     {data.telefone_2}
    //                 </div>
    //                 <div className="m-0.5">
    //                     <label className="mr-2">
    //                         CPF: 
    //                     </label>
    //                     {data.cpf}
    //                 </div>
    //                 <div className="m-0.5">
    //                     <label className="mr-2">
    //                         Cidade: 
    //                     </label>
    //                     {data.cidade}
    //                 </div>
    //                 <div className="m-0.5">
    //                     <label className="mr-2">
    //                         Estado: 
    //                     </label>
    //                     {data.estado}
    //                 </div>
    //                 <div className="m-0.5">
    //                     <label className="mr-2">
    //                         Bairro: 
    //                     </label>
    //                     {data.bairro}
    //                 </div>
    //                 <div className="m-0.5">
    //                     <label className="mr-2">
    //                         Rua: 
    //                     </label>
    //                     {data.rua}
    //                 </div>
    //                 <div className="m-0.5">
    //                     <label className="mr-2">
    //                         Numero: 
    //                     </label>
    //                     {data.numero}
    //                 </div>
    //                 <div className="m-0.5">
    //                     <label className="mr-2">
    //                         CEP: 
    //                     </label>
    //                     {data.cep}
    //                 </div>

    //                 <BotoesEditarExcluir cliente_id={data.cliente_id} />
    //             </div>
    //         )}
    //         {data?.length == 0 ? 
    //             <div className="flex flex-col bg-zinc-200 hover:shadow-2xl rounded-3xl px-5 py-5 border-2 border-black border-solid shadow-md">
    //                 <br />
    //                 <h1>Você não possui nenhum cliente cadastrado!</h1>
    //                 <br />
    //                 <BotaoRedirecionarParaCadastro />
    //             </div>
    //              : ""}
    //     </div>
    //     <br />
    // </div>

  )
}
