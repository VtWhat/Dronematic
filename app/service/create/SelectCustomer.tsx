'use client'
import { Database } from '@/supabase'
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import toast from 'react-hot-toast'
import Link from 'next/link'

export default function SelectCustomer(data: {cliente_id: any}) {
  const supabase = createClientComponentClient<Database>()

  return (
        <Link
        href={{
            pathname: '/service/create/cat',
            query: data
        }}
        >
        <button
            className="py-2 px-4 rounded-md no-underline bg-black hover:bg-green-900 text-white"
            onClick={() => toast.success("Cliente Selecionado")}
        >
          Selecionar
        </button>
    </Link>
  )
}