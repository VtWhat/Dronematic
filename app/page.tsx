import NavBar from '@/components/NavBar'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export default async function Index() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <div className="w-full flex flex-col items-center">
      <NavBar session={session} />

      {/* <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm text-foreground">
          <DronematicLogo />
          {user ? (
            <div className="flex items-center gap-4 text-black">
              Olá, {user.email}!
              <LogoutButton />
            </div>
          ) : (
            <Link
              href="/login"
              className="py-2 px-3 flex rounded-md no-underline bg-black hover:bg-green-900"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
      Página de explicação do projeto, funcionalidades, finalidade, etc */}
      
    </div>
  )
}
