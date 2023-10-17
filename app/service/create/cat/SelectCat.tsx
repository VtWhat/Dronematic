'use client'
import { useEffect, useState } from 'react'
import { Database } from '@/supabase'
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { z } from "zod";
import toast from 'react-hot-toast'
import Link from 'next/link'

export default function SelectCustomer(data: {cliente_id: any}) {
  const supabase = createClientComponentClient<Database>()

  return (
    <div className='w-full flex flex-col items-center gap-2'>
        <button className="py-2 px-3 flex rounded-md no-underline bg-black hover:bg-green-900 text-white"
            >Fotografia Aérea
        </button>
        <button className="py-2 px-3 flex rounded-md no-underline bg-black hover:bg-green-900 text-white"
            >Filmagem e Vídeo
        </button>
        <button className="py-2 px-3 flex rounded-md no-underline bg-black hover:bg-green-900 text-white"
            >Vídeo Imobiliário
        </button>
        <button className="py-2 px-3 flex rounded-md no-underline bg-black hover:bg-green-900 text-white"
            >Filmagem de Evento
        </button>
        <button className="py-2 px-3 flex rounded-md no-underline bg-black hover:bg-green-900 text-white"
            >Casamento
        </button>
        <button className="py-2 px-3 flex rounded-md no-underline bg-black hover:bg-green-900 text-white"
            >Vídeo Institucional
        </button>
        <button className="py-2 px-3 flex rounded-md no-underline bg-black hover:bg-green-900 text-white"
            >Inspeção Técnica
        </button>
        <button className="py-2 px-3 flex rounded-md no-underline bg-black hover:bg-green-900 text-white"
            >Inspeção de Painéis Solares
        </button>
        <button className="py-2 px-3 flex rounded-md no-underline bg-black hover:bg-green-900 text-white"
            >Acompanhamento de Obras
        </button>
        <button className="py-2 px-3 flex rounded-md no-underline bg-black hover:bg-green-900 text-white"
            >Mapeamento 3D
        </button>
        <button className="py-2 px-3 flex rounded-md no-underline bg-black hover:bg-green-900 text-white"
            >Agro
        </button>
        <button className="py-2 px-3 flex rounded-md no-underline bg-black hover:bg-green-900 text-white"
            >Outros
        </button>
    </div>
  )
}