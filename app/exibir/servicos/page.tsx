import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import BackButton from '@/components/BackButton'
import NavBar from '@/components/NavBar'

export default async function ExibirServicos() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="w-full flex flex-col items-center">
        <NavBar email={user?.email}/>
        Exibição de serviços cadastrados para usuário autenticado

        <BackButton />
      
    </div>
  )
}
