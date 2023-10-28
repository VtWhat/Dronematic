import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Back from '@/components/Back'
import NavBar from '@/components/NavBar'
import { Database } from '@/supabase'
import CadastroForm from './CadastroForm'

export default async function CadastrarCliente() {
  const supabase = createServerComponentClient<Database>({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <div>
      <NavBar session={session}/>

      <CadastroForm  session={session}/>
      
    </div>
  )
}
