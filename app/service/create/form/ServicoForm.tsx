'use client'
import { useCallback, useEffect, useState } from 'react'
import { Database } from '@/supabase'
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter, useSearchParams } from 'next/navigation'
import { z } from "zod";
import toast from 'react-hot-toast'

export default function CadastrarServicoForm({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient<Database>()

  const clienteID = Number(useSearchParams().get('cliente_id'))
  const categ = Number(useSearchParams().get('cat'))

  const [nome, setNome] = useState<string>("")
  const [sobrenome, setSobrenome] = useState<string>("")
  const [email, setEmail] = useState<string>("")

  const user = session?.user
  const router = useRouter()

  const ServicoSchema = z.object({
    Nome: 
      z.string().
      min(3, "Mínimo 3 caractéres").
      max(60, "Máximo 60 caractéres").
      toUpperCase(),
    Sobrenome: 
      z.string().
      min(3, "Mínimo 3 caractéres").
      max(60, "Máximo 60 caractéres").
      toUpperCase(),
    Email: 
      z.string().
      max(100, "Máximo 100 caractéres").
      email("Por favor insira um email válido").
      toUpperCase(),
    })

    const getCliente = useCallback(async () => {
        toast.loading("Carregando dados", {id:"upCliToast"})
        try {
          let { data, error, status } = await supabase
            .from("clientes")
            .select("nome, sobrenome, email")
            .eq('cliente_id', clienteID)
            .single()
    
          if (error && status !== 406) {
            throw error
          }
    
          if (data) {
            setNome(data.nome)
            setSobrenome(data.sobrenome)
            setEmail(data.email)          
            {toast.success("Dados carregados!", {id:"upCliToast"})}
          }
        } catch (error) {
          toast.error('Error ao carregar dados do cliente!')
        } finally {
        }
      }, [user, supabase])

      useEffect(() => {
        getCliente()
      }, [user, getCliente])

  async function cadastrarServico({
    nome,
    sobrenome,
    email,
  }: {
    email: string
    nome: string
    sobrenome: string
  }) {

    const clienteData = {
      Nome: nome,
      Sobrenome: sobrenome,
      Email: email,
    }

    const result = ServicoSchema.safeParse(clienteData)
    if(!result.success){

      result.error.issues.forEach((issue) => {
        let errorMessage = ""

        errorMessage = issue.path + ": " + issue.message + ". ";
        toast.error(errorMessage)
      })


    }else{
      try {

        // let { error } = await supabase.from('clientes').insert({
        //   nome: clienteData.Nome,
        //   sobrenome: clienteData.Sobrenome,
        //   email: clienteData.Email,
        //   user_id: user?.id as string,
        // })

        // if (error) throw error

        toast.success('Cliente cadastrado!')
        router.prefetch("/exibir/clientes")
        router.push("/home")

      } catch (error) {
        toast.error('Erro ao cadastrar cliente!')
        console.log(error)
      }
    }
  }

  return (
    <div className="form-widget flex flex-col gap-3">
    <div>Informações do Cliente
      <div className="flex flex-col">
        <label htmlFor="nome">Nome</label>
        <input
          id="nome"
          type="text"
          value={nome || ''}
          className="bg-zinc-200 rounded-md px-2"
          placeholder=""
          onChange={(e) => setNome(e.target.value)}
          disabled
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="sobrenome">Sobrenome</label>
        <input
          id="nome"
          type="text"
          value={sobrenome || ''}
          className="bg-zinc-200 rounded-md px-2"
          placeholder=""
          onChange={(e) => setSobrenome(e.target.value)}
          disabled
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          value={email || ''}
          className="bg-zinc-200 rounded-md px-2"
          placeholder=""
          onChange={(e) => setEmail(e.target.value)}
          disabled
        />
      </div>
    </div>
    <div>Informações do serviço

    </div>
    <div>Especificações

    </div>

        <button
            className="py-2 px-4 rounded-md no-underline bg-black hover:bg-green-900 text-white"
            onClick={() => cadastrarServico({ nome, sobrenome, email})}
        >
          Cadastrar
        </button>
    </div>
  )
}