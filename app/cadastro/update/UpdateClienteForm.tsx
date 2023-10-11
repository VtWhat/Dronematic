'use client'
import { useCallback, useEffect, useState } from 'react'
import { Database } from '@/supabase'
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter, useSearchParams } from 'next/navigation'

export default function UpdateClienteForm({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient<Database>()
  const [nome, setNome] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [telefone, setTelefone] = useState<string>("")
  const user = session?.user
  const router = useRouter()
  const clienteID = Number(useSearchParams().get('cliente_id'))

  const getProfile = useCallback(async () => {
    try {
      let { data, error, status } = await supabase
        .from("clientes")
        .select("*")
        .eq('cliente_id', clienteID)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setNome(data.nome)
        setEmail(data.email)
        setTelefone(data.telefone)
      }
    } catch (error) {
      alert('Error ao carregar dados do cliente!')
    } finally {
    }
  }, [user, supabase])

  useEffect(() => {
    getProfile()
  }, [user, getProfile])

  console.log(clienteID, getProfile)


  async function updateCliente({
    nome,
    email,
    telefone,
  }: {
    nome: string
    email: string
    telefone: string
  }) {
    try {

      let { error } = await supabase.from('clientes').update({
        nome,
        email,
        telefone,
      })
      .eq("cliente_id", clienteID)

      if (error) throw error

      router.prefetch("/exibir/clientes")
      alert('Dados do Cliente atualizados!')
      router.push("/exibir/clientes")

    } catch (error) {
      alert('Erro ao atualizar dados do cliente!')
    }
  }

  return (
    <div className="form-widget flex flex-col gap-3">
      <div className="flex flex-col">
        <label htmlFor="nome">Nome</label>
        <input
          id="nome"
          type="text"
          value={nome || ''}
          className="bg-zinc-200 rounded-md px-2"
          onChange={(e) => setNome(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="url"
          value={email || ''}
          className="bg-zinc-200 rounded-md px-2"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="telefone">Telefone</label>
        <input
          id="telefone"
          type="text"
          value={telefone || ''}
          className="bg-zinc-200 rounded-md px-2"
          onChange={(e) => setTelefone(e.target.value)}
        />
      </div>

      <div>
        <button
            className="py-2 px-4 rounded-md no-underline bg-black hover:bg-green-900 text-white"
            onClick={() => updateCliente({ nome, email, telefone })}
        >
          Salvar
        </button>
      </div>
    </div>
  )
}