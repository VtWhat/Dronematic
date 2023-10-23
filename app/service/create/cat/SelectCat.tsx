'use client'
import { useEffect, useState } from 'react'
import { Database } from '@/supabase'
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter, useSearchParams } from 'next/navigation'
import { z } from "zod";
import toast from 'react-hot-toast'
import Link from 'next/link'

export default function SelectCat() {
  const supabase = createClientComponentClient<Database>()

  const clienteID = Number(useSearchParams().get('cliente_id'))

  let categorias: string[] = ['Fotografia Aérea', 'Filmagem e Vídeo', 'Vídeo Imobiliário', 'Filmagem de Evento', 'Casamento', 'Vídeo Institucional', 'Inspeção Técnica','Inspeção de Painéis Solares','Acompanhamento de Obras','Mapeamento 3D', 'Agro', 'Outros'];

  return (
    <div className='w-full flex flex-col items-center gap-2'>
        {categorias?.map((cat, index) => 
        <Link
        key={index}
        href={{
            pathname: '/service/create/form',
            query: "cliente_id="+clienteID.toString()+"&cat="+cat
        }}
        >
            <button 
            className="py-2 px-3 flex rounded-md no-underline bg-black hover:bg-green-900 text-white"
            onClick={() => toast.success("Categoria Selecionada!")}
                >{cat}
            </button>
        </Link>
        )}
    </div>
  )
}