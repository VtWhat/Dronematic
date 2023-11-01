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

  let cols =
  clientes?.length == 1 ? 1 :
  clientes?.length == 2 ? 2 :
  clientes?.length == 3 ? 3 : 3

  return (
    <div className='w-full flex justify-center items-center'>
      {clientes?.length != 0 ?
        <div className={`grid grid-cols-${cols} gap-4 py-10`}>
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
       :
        <div className='py-10 flex items-center justify-center'> 
          <Card className='p-4 w-full'>
              <CardHeader className='text-black w-full'>
                    Você não possui nenhum cliente cadastrado!
              </CardHeader>
              <div className='w-full flex justify-center items-center'>
                <Button color="primary" variant="shadow" radius="full" size="lg" className='w-1/2'
                onClick={() => router.push('/customer/create')}
                >Cadastro de Clientes
                </Button>
              </div>
          </Card> 
        </div>
        }
    </div>
  )
}
