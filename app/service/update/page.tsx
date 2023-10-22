import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import BackButton from '@/components/BackButton'
import NavBar from '@/components/NavBar'
import { Database } from '@/supabase'
import UpdateServiceForm from './UpdateServiceForm'

export default async function UpdateService() {
  const supabase = createServerComponentClient<Database>({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <div className="w-full flex flex-col items-center">
      <NavBar email={session?.user.email}/>
        Formulário de atualização de serviços

        <BackButton />

        <UpdateServiceForm  session={session}/>
      
    </div>
  )
}
