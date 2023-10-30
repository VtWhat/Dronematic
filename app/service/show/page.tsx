import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Back from '@/components/Back'
import NavBar from '@/components/NavBar'
import { Database } from '@/supabase'
import ServicesList from './ServicesList'

export default async function ExibirServicos() {
  const supabase = createServerComponentClient<Database>({ cookies })
  
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const {
    data: servicos 
  } = await supabase.from('servicos').select('*, config(*), clientes(*)')


  const {
    data: userprofile 
  } = await supabase.from('userprofile').select('*').single()

  return (
    <div>
      <NavBar session={session}/>

      <ServicesList servicos={servicos} userprofile-={userprofile}/>
      
    </div>
  )
}
