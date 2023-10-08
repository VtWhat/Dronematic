import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import BackButton from '@/components/BackButton'
import FormCliente from './FormCliente'
import NavBar from '@/components/NavBar'

export default async function CadastrarServiço() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="w-full flex flex-col items-center">
      <NavBar email={user?.email}/>
        Formulário de cadastro de clientes

        <BackButton />

        <FormCliente />
      
    </div>
  )
}
