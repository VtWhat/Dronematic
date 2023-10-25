'use client'
import { useCallback, useEffect, useState } from 'react'
import { Database } from '@/supabase'
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import toast from 'react-hot-toast'

export default function UpdateUserProfileForm({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient<Database>()

  const [nome, setNome] = useState<string>("")
  const [endereco, setEndereco] = useState<string>("")
  const [email, setEmail] = useState<string | undefined>("")
  const [telefone, setTelefone] = useState<string>("")
  const [website, setWebsite] = useState<string | null>("")
  const [senha, setSenha] = useState<string>("")

  const user = session?.user

  const router = useRouter()

  const userProfileSchema = z.object({
    Nome: 
      z.string().
      min(3, "Mínimo 3 caractéres").
      max(60, "Máximo 60 caractéres"),
    Endereco: 
      z.string().
      min(3, "Mínimo 3 caractéres").
      max(60, "Máximo 60 caractéres"),
    Telefone: 
      z.string().
      min(8, "Mínimo 8 digitos").
      max(15, "Máximo 15 digitos"),
    Website: 
      z.string().optional()
    })

  const getUserProfile = useCallback(async () => {
    try {
        setEmail(user?.email)
        setSenha("********")

      let { data, error, status } = await supabase
        .from("userprofile")
        .select("*")
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setNome(data.nome)
        setEndereco(data.endereco)
        setTelefone(data.telefone)
        setWebsite(data.website)

        {toast.success("Dados carregados!", {id:"upCliToast"})}
      }
    } catch (error) {
      toast.error('Error ao carregar dados do usuário!')
    } finally {
    }
  }, [user, supabase])

  useEffect(() => {
    getUserProfile()
  }, [user, getUserProfile])

  async function updateUser() {

    const userData = {
        Nome: nome,
        Endereco: endereco,
        Telefone: telefone,
        Website: website
    }

    const result = userProfileSchema.safeParse(userData)

    if(!result.success){
      result.error.issues.forEach((issue) => {
        let errorMessage = ""

        errorMessage = issue.path + ": " + issue.message + ". ";
        toast.error(errorMessage)
      })

    }else{
      try {
        
        let { error: insertErr } = await supabase.from('userprofile').insert({
        nome: nome,
        endereco: endereco,
        telefone: telefone,
        website: website,
        user_id: user?.id as string
        })

        if(insertErr){
            let { error: updateErr } = await supabase.from('userprofile').update({
            nome: nome,
            endereco: endereco,
            telefone: telefone,
            website: website
            }).eq("user_id", user?.id as string)

            if (updateErr) throw updateErr

        }
        
        toast.success('Dados do Usuário atualizados!')
        router.push("/home")

      } catch (error) {
        toast.error('Erro ao atualizar dados do usuário!')
      }
    }
  }

  return (
    <div className="form-widget flex flex-col gap-3">
      <div className="flex flex-col">
        <label htmlFor="nome">Nome Completo</label>
        <input
          id="nome"
          type="text"
          value={nome || ''}
          className="bg-zinc-200 rounded-md px-2"
          placeholder="Digite seu Nome"
          onChange={(e) => setNome(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="endereco">Endereço</label>
        <input
          id="endereco"
          type="text"
          value={endereco || ''}
          className="bg-zinc-200 rounded-md px-2"
          placeholder="Digite seu Endereço"
          onChange={(e) => setEndereco(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="telefone">Telefone</label>
        <input
          id="telefone"
          type="number"
          value={telefone || ''}
          placeholder="Digite seu Telefone"
          className="bg-zinc-200 rounded-md px-2"
          onChange={(e) => setTelefone(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="website">Website <small>Opcional</small></label>
        <input
          id="website"
          type="text"
          value={website || ''}
          placeholder="Digite seu Website"
          className="bg-zinc-200 rounded-md px-2"
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          value={email || ""}
          placeholder="email@gmail.com"
          className="bg-zinc-200 rounded-md px-2"
          disabled
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="senha">Senha</label>
        <input
          id="senha"
          type="text"
          value={senha|| ""}
          placeholder="********"
          className="bg-zinc-200 rounded-md px-2"
          disabled
        />
      </div>

        <button
            className="py-2 px-4 rounded-md no-underline bg-black hover:bg-green-900 text-white"
            onClick={() => updateUser()}
        >
          Salvar
        </button>
    </div>
  )
}