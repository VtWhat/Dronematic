import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import DronematicLogo from '@/components/DronematicLogo'
import LogoutButton from '@/components/LogoutButton'
import { redirect } from 'next/navigation'


export const dynamic = 'force-dynamic'

export default async function Home() {
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
        Página de menu com opções
        <Link
          href="/cadastro/cliente"
          className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover text-white"
        >
          Cadastrar Cliente
        </Link>
        <Link
          href="/cadastro/servico"
          className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover text-white"
        >
          Cadastrar Serviço
        </Link>
        <Link
          href="/exibir/clientes"
          className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover text-white"
        >
          Ver Clientes
        </Link>
        <Link
          href="/exibir/servicos"
          className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover text-white"
        >
          Ver Serviços
        </Link>
      
    </div>
  )
}
