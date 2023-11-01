'use client'

import toast from 'react-hot-toast'
import Link from 'next/link'
import { Button, Card, CardBody, CardHeader, Image } from '@nextui-org/react'
import { useRouter } from 'next/navigation'


interface Cliente {
  cliente_id: number,
  nome: string,
  sobrenome: string,
  email: string,
  telefone_1: string,
  cidade: string,
  estado: string
}

export default function SelectCustomer({ clientes }: { clientes: Cliente[] | null}) {
  const router = useRouter()

  let cols =
    clientes?.length == 1 ? 1 :
    clientes?.length == 2 ? 2 :
    clientes?.length == 3 ? 3 : 3

  return (
    <div className='w-full flex justify-center items-center'>
      {clientes?.length != 0 ?
        <div className={`grid grid-cols-${cols} gap-4 py-10`}>
          {clientes?.map((cliente) => 
          <Link href={{pathname: '/service/create/cat', query: clientes ? "cliente_id=" + (cliente.cliente_id).toString() : ""}}>
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
                    {cliente.cidade}-{cliente.estado}
                </p>
                </CardHeader>
            </Card>
          </Link>
          )}
        </div>
       :
       <div className='py-10 flex items-center justify-center'> 
        <Card className='p-4 w-full'>
            <CardHeader className='text-black w-full'>
                  Você precisa ter ao menos um cliente cadastrado para poder cadastrar um serviço!
            </CardHeader>
            <div className='w-full flex justify-center items-center'>
              <Button color="primary" variant="shadow" radius="full" size="lg" className='w-1/3'
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