import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Back from '@/components/Back'
import NavBar from '@/components/NavBar'
import { Database } from '@/supabase'
import CustomersList from './CustomersList'

export default async function ExibirClientes() {
  const supabase = createServerComponentClient<Database>({ cookies })
  
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const {
    data: clientes,
  } = await supabase.from("clientes").select("*")

  return (
    <div>
      <NavBar session={session}/>

      <CustomersList clientes={clientes}/>
      
    </div>
  )
}
