import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import NavBar from '@/components/NavBar'
import Menu from './Menu'

export default async function Home() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <div>

      <NavBar session={session}/>

      <Menu />

    </div>
  )
}
