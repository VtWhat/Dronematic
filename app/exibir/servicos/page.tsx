import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import DronematicLogo from '@/components/DronematicLogo'
import LogoutButton from '@/components/LogoutButton'
import { redirect } from 'next/navigation'


export const dynamic = 'force-dynamic'

export default async function ExibirServicos() {
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
        Exibição de serviços cadastrados para usuário autenticado

        <Link
        href="/home"
        className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{' '}
        Voltar
      </Link>
      
    </div>
  )
}
