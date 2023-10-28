import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Back from '@/components/Back'
import NavBar from '@/components/NavBar'
import { Database } from '@/supabase'
import UpdateUserProfileForm from './UpdateUserProfileForm'

export default async function UpdateUserProfile() {
  const supabase = createServerComponentClient<Database>({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <div>
      <NavBar session={session}/>

      <UpdateUserProfileForm  session={session}/>
      
    </div>
  )
}
