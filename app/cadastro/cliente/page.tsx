import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import BackButton from '@/components/BackButton'
import NavBar from '@/components/NavBar'
import { Database } from '@/supabase'
import CadastroForm from './CadastroForm'

export default async function CadastrarServiço() {
  const supabase = createServerComponentClient<Database>({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <div className="w-full flex flex-col items-center">
      <NavBar email={session?.user.email}/>
        Formulário de cadastro de clientes

        <BackButton />

        <CadastroForm  session={session}/>
      
    </div>
  )
}
