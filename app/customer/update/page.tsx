import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import BackButton from '@/components/BackButton'
import NavBar from '@/components/NavBar'
import { Database } from '@/supabase'
import UpdateClienteForm from './UpdateClienteForm'

export default async function CadastrarCliente() {
  const supabase = createServerComponentClient<Database>({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <div className="w-full flex flex-col items-center">
      <NavBar email={session?.user.email}/>
        Formulário de atualização de clientes

        <BackButton />

        <UpdateClienteForm  session={session}/>
      
    </div>
  )
}
