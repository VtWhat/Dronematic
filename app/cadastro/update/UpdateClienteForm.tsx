'use client'
import { useCallback, useEffect, useState } from 'react'
import { Database } from '@/supabase'
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter, useSearchParams } from 'next/navigation'
import { z } from 'zod'
import toast from 'react-hot-toast'

export default function UpdateClienteForm({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient<Database>()
  const [nome, setNome] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [telefone, setTelefone] = useState<string>("")
  const user = session?.user
  const router = useRouter()
  const clienteID = Number(useSearchParams().get('cliente_id'))

  const ClienteSchema = z.object({
    Nome: 
      z.string().
      min(3, "O nome precisa ter no mínimo 3 caractéres").
      max(60, "O limite do nome é de 60 caracteres"),
    Email: 
      z.string().
      max(100, "O limite de caractéres é de 100").
      email("Por favor insira um email válido"),
    Telefone: 
      z.string().
      min(8, "São necessários no mínimo 8 digitos").
      max(15, "O limite de digitos é de 15 digitos")
  })

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
        {toast.success("Dados carregados!", {id:"upCliToast"})}
      }
    } catch (error) {
      toast.error('Error ao carregar dados do cliente!')
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

    const clienteData = {
      Nome: nome,
      Email: email,
      Telefone: telefone,
    }

    const result = ClienteSchema.safeParse(clienteData)
    if(!result.success){

      result.error.issues.forEach((issue) => {
        let errorMessage = ""

        errorMessage = issue.path + ": " + issue.message + ". ";
        toast.error(errorMessage)
      })


    }else{
      try {

        let { error } = await supabase.from('clientes').update({
          nome: clienteData.Nome,
          email: clienteData.Email,
          telefone: clienteData.Telefone,
        })
        .eq("cliente_id", clienteID)

        if (error) throw error

        router.prefetch("/exibir/clientes")
        toast.success('Dados do Cliente atualizados!')
        router.push("/exibir/clientes")

      } catch (error) {
        toast.error('Erro ao atualizar dados do cliente!')
      }
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
          type="tel"
          value={telefone || ""}
          className="bg-zinc-200 rounded-md px-2"
          onChange={(e) => setTelefone(e.target.value)}
        />
      </div>

        <button
            className="py-2 px-4 rounded-md no-underline bg-black hover:bg-green-900 text-white"
            onClick={() => updateCliente({ nome, email, telefone })}
        >
          Salvar
        </button>
    </div>
  )
}