import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Back from '@/components/Back'
import NavBar from '@/components/NavBar'
import { Database } from '@/supabase'
import SelectCustomer from './SelectCustomer'

export default async function CadastrarServico() {
  const supabase = createServerComponentClient<Database>({ cookies })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const {
    data: clientes,
  } = await supabase.from("clientes").select("cliente_id, nome, sobrenome, email, telefone_1, cidade, estado")

  return (
    <div>
      <NavBar session={session}/>

      <SelectCustomer clientes={clientes}/>

    </div>
  )
}
