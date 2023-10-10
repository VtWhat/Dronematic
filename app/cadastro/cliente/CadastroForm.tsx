'use client'
import { useState } from 'react'
import { Database } from '@/supabase'
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function CadastrarClientesForm({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient<Database>()
  const [nome, setNome] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [telefone, setTelefone] = useState<string>("")
  const user = session?.user

  async function cadastrarCliente({
    nome,
    email,
    telefone,
  }: {
    nome: string
    email: string
    telefone: string
  }) {
    try {

      let { error } = await supabase.from('clientes').insert({
        nome,
        email,
        telefone,
        user_id: user?.id as string,
      })
      if (error) throw error
      alert('Cliente cadastrado!')
    } catch (error) {
      alert('Erro ao cadastrar cliente!')
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
            className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover text-white"
            onClick={() => cadastrarCliente({ nome, email, telefone })}
        >
          Cadastrar
        </button>
      </div>
    </div>
  )
}