import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import NavBar from '@/components/NavBar'
import ManageMenu from './ManageMenu'

export default async function Manage() {
  const supabase = createServerComponentClient({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <div>

      <NavBar session={session}/>

      <ManageMenu />

    </div>
  )
}
