'use client'

import { Session } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import {Image} from "@nextui-org/image";

export default function Menu() {
    const router = useRouter()

    return (
<div className='w-full flex justify-center items-center'>
        <div className="grid grid-cols-3 grid-rows-2 gap-4 p-10 w-1/2">
          <Card 
          className="py-4 col-span-2 flex flex-row overflow-visible justify-center items-center" 
          isPressable 
          onClick={(e) => router.push('/service/show')} >
            <CardHeader className="pl-6 flex-col w-1/2 items-start">
              <h4 className="font-bold text-large text-black">Agenda de Voos</h4>
              <p className='text-black text-justify text-small'>Visualize aqui sua agenda de voos e todas as informações pertinentes a eles,
              como local de voo, rotas para o local, horários entre outras informações</p>
            </CardHeader>
            <CardBody className="overflow-visible">
              <Image
                alt="Card background"
                className="object-cover overflow-visible h-52 w-96"
                src="/HomeDrone.png"
              />
            </CardBody>
          </Card>

          <Card className="py-4" isPressable 
          onClick={(e) => router.push('#')} >
          <CardBody className="overflow-visible py-2">
              <Image
                alt="Card background"
                className="object-cover rounded-xl"
                src="/dronematic-logo.png"
                width={270}
              />
            </CardBody>
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <h4 className="font-bold text-large text-black">Meteorologia</h4>
            </CardHeader>
          </Card>

          <Card className="py-4" isPressable 
          onClick={(e) => router.push('/customer/create')} >
          <CardBody className="overflow-visible py-2">
              <Image
                alt="Card background"
                className="object-cover rounded-xl h-36"
                src="/HomeBridge.webp"
                width={270}
              />
            </CardBody>
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <h4 className="font-bold text-large text-black">Cadastrar Cliente</h4>
              <p className='text-black text-justify text-small'>
                Aqui você pode cadastrar seus clientes com seus respectivos dados essenciais
              </p>
            </CardHeader>
          </Card>

          <Card className="py-4" isPressable 
          onClick={(e) => router.push('/service/create')} >
          <CardBody className="overflow-visible py-2">
              <Image
                alt="Card background"
                className="object-cover rounded-xl h-36"
                src="/HomeAgro.jpg"
                width={270}
              />
            </CardBody>
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <h4 className="font-bold text-large text-black">Cadastrar Serviço</h4>
              <p className='text-black text-justify text-small'>
                Cadastre seus serviços e todos os seus dados técnicos necessários para o plano de voo aqui
              </p>
            </CardHeader>
          </Card>

          <Card className="py-4" isPressable 
          onClick={(e) => router.push('/service/show')} >
          <CardBody className="overflow-visible py-2">
              <Image
                alt="Card background"
                className="object-cover rounded-xl h-36"
                src="/HomeWorkers.jpg"
                width={270}
              />
            </CardBody>
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <h4 className="font-bold text-large text-black">Gerenciar Dados</h4>
              <p className='text-black text-justify text-small'>
                Visualize, atualize ou remova clientes e trabalhos cadastrados
              </p>
            </CardHeader>
          </Card>
        </div>
      </div>
    )
  }
  