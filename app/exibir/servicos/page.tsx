import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import DronematicLogo from '@/components/DronematicLogo'
import LogoutButton from '@/components/LogoutButton'
import { redirect } from 'next/navigation'
import BackButton from '@/components/BackButton'
import NavBar from '@/components/NavBar'


export const dynamic = 'force-dynamic'

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
