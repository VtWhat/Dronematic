'use client'

import { useRouter } from "next/navigation";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import {Image} from "@nextui-org/image";

export default function ManageMenu() {
    const router = useRouter()

    return (
        <div className='w-full flex justify-center items-center'>
            <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-4 py-10 md:w-1/2">

            <Card className="py-4" isPressable 
            onClick={(e) => router.push('/customer/show')} >
            <CardBody className="overflow-visible py-2  flex items-center">
                <Image
                    alt="Card background"
                    className="object-cover rounded-xl h-36"
                    src="/clientes.jpeg"
                    width={270}
                />
                </CardBody>
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <h4 className="font-bold text-large text-black">Clientes</h4>
                <p className='text-black text-justify text-small'>
                    Gerencie os dados dos seus clientes
                </p>
                </CardHeader>
            </Card>

            <Card className="py-4" isPressable 
            onClick={(e) => router.push('/service/show')} >
            <CardBody className="overflow-visible py-2  flex items-center">
                <Image
                    alt="Card background"
                    className="object-cover rounded-xl h-36"
                    src="/servicos.jpeg"
                    width={270}
                />
                </CardBody>
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <h4 className="font-bold text-large text-black">Serviços</h4>
                <p className='text-black text-justify text-small'>
                Gerencie os dados dos seus serviços
                </p>
                </CardHeader>
            </Card>

            <Card className="py-4" isPressable 
            onClick={(e) => router.push('/user/update')} >
            <CardBody className="overflow-visible py-2">
                <Image
                    alt="Card background"
                    className="object-cover rounded-xl h-36"
                    src="/meusdados.webp"
                    width={270}
                />
                </CardBody>
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <h4 className="font-bold text-large text-black">Meus Dados</h4>
                <p className='text-black text-justify text-small'>
                    Gerencie os seus dados
                </p>
                </CardHeader>
            </Card>
            </div>
        </div>
    )
  }
  