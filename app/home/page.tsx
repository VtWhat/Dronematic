import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import NavBar from '@/components/NavBar'

export default async function Home() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="w-full flex flex-col items-center gap-2">
        <NavBar email={user?.email}/>
        Página de menu com opções
        <br />
        <Link
          href="/customer/create"
          className="py-2 px-3 flex rounded-md no-underline bg-black hover:bg-green-900 text-white"
        >
          Cadastrar Cliente
        </Link>
        <Link
          href="/customer/show"
          className="py-2 px-3 flex rounded-md no-underline bg-black hover:bg-green-900 text-white"
        >
          Ver Clientes
        </Link>
        <Link
          href="/service/create"
          className="py-2 px-3 flex rounded-md no-underline bg-black hover:bg-green-900 text-white"
        >
          Cadastrar Serviço
        </Link>
        
        {/* <Link
          href="/exibir/servicos"
          className="py-2 px-3 flex rounded-md no-underline bg-black hover:bg-green-900 text-white"
        >
          Ver Serviços
        </Link> */}
      
    </div>
  )
}
