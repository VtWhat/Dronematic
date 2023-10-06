import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import DronematicLogo from '@/components/DronematicLogo'
import LogoutButton from '@/components/LogoutButton'
import { redirect } from 'next/navigation'
import BackButton from '@/components/BackButton'


export const dynamic = 'force-dynamic'

export default async function CadastrarServiço() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="w-full flex flex-col items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm text-foreground">
          <DronematicLogo />
          {user ? (
            <div className="flex items-center gap-4 text-black">
              Olá, {user.email}!
              <LogoutButton />
            </div>
          ) : (
            redirect('/login')
          )}
        </div>
      </nav>
        Formulário de cadastro de serviços

        <BackButton />
      
    </div>
  )
}
