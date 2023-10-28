'use client'

import { useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import {Image} from "@nextui-org/image";

export default function SelectCat() {

  const router = useRouter()

  const clienteID = Number(useSearchParams().get('cliente_id'))

  const categorias: string[] = [
    'Fotografia Aérea',
    'Filmagem e Vídeo',
    'Vídeo Imobiliário',
    'Filmagem de Evento',
    'Casamento',
    'Vídeo Institucional',
    'Inspeção Técnica',
    'Inspeção de Painéis Solares',
    'Acompanhamento de Obras',
    'Mapeamento 3D',
    'Agro',
    'Outros'
  ];

  const images: string[] = [
    "/cat0.jpg",
    "/cat1.jpg",
    '/cat2.jpg',
    '/cat3.jpg',
    '/cat4.jpg',
    '/cat5.jpg',
    '/cat6.jpg',
    '/cat7.jpg',
    '/cat8.jpg',
    '/cat9.jpg',
    '/cat10.jpg',
    '/cat11.jpeg'
  ];

  return (
    <div className='w-full flex justify-center items-center'>
        <div className="grid grid-cols-3 grid-rows-2 gap-4 p-10 w-1/2">
        {categorias?.map((cat, index) =>
          <Link href={{
                    pathname: '/service/create/form',
                    query: "cliente_id="+clienteID.toString()+"&cat="+cat
                }}>
            <Card className="py-4" isPressable>
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
                <h4 className="font-bold text-large text-black">{cat}</h4>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <Image
                    alt="Card background"
                    className="object-cover rounded-xl h-36"
                    src={images[index]}
                    width={270} 
                />
              </CardBody>
            </Card>
          </Link>
          )}
        </div>
    </div>









    // <div className='w-full flex flex-col items-center gap-2'>
    //     {categorias?.map((cat, index) => 
    //     <Link
    //     key={index}
    //     href={{
    //         pathname: '/service/create/form',
    //         query: "cliente_id="+clienteID.toString()+"&cat="+cat
    //     }}
    //     >
    //         <button 
    //         className="py-2 px-3 flex rounded-md no-underline bg-black hover:bg-green-900 text-white"
    //         onClick={() => toast.success("Categoria Selecionada!")}
    //             >{cat}
    //         </button>
    //     </Link>
    //     )}
    // </div>
  )
}