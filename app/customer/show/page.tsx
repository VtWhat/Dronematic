import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import BackButton from '@/components/BackButton'
import NavBar from '@/components/NavBar'
import { Database } from '@/supabase'
import FetchClientes from './FetchClientes'

export default async function ExibirClientes() {
  const supabase = createServerComponentClient<Database>({ cookies })
  
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <div className="w-full flex flex-col items-center">
      <NavBar session={session}/>
        Exibição de Clientes Cadastrados pelo usuário

        <BackButton />

        <FetchClientes />
      
    </div>
  )
}
