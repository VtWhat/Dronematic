'use client'
import { useCallback, useEffect, useState } from 'react'
import { Database } from '@/supabase'
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { Button } from "@nextui-org/button";
import {Input} from "@nextui-org/input";

export default function UpdateUserProfileForm({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient<Database>()

  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const [nome, setNome] = useState<string>("")
  const [endereco, setEndereco] = useState<string>("")
  const [email, setEmail] = useState<string | undefined>("")
  const [telefone, setTelefone] = useState<string>("")
  const [website, setWebsite] = useState<string | null>("")

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
        setIsLoaded(true)

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
    <div className='w-full flex flex-col justify-center items-center'>  
      <form
      className="bg-white flex flex-col justify-center items-center py-10 md:px-24 px-16 rounded-xl gap-4 shadow-2xl my-10">
          <label className="text-3xl font-sans font-bold text-black">Dados do Usuário</label>

          <Input label="Nome Completo" size="sm" value={nome || ''} variant="faded" radius="full" onChange={(e) => setNome(e.target.value)}/>
          <Input label="Endereço" size="sm" value={endereco || ''} variant="faded" radius="full" onChange={(e) => setEndereco(e.target.value)}/>
          <Input label="Telefone" type="number" value={telefone || ''} size="sm" variant="faded" radius="full" onChange={(e) => setTelefone(e.target.value)}/>
          <Input label="Website" value={website || ''} size="sm" variant="faded" radius="full" onChange={(e) => setWebsite(e.target.value)}/>
          <Input isReadOnly label="Email" value={email || ''} size="sm" variant="faded" radius="full"/>
          <Input isReadOnly label="Senha" value={"********"} size="sm" variant="faded" radius="full"/>

          <Button color="primary" variant="shadow" radius="full" size="lg" isLoading={!isLoaded}
          onClick={() => updateUser()}>
            Salvar Dados
          </Button>
      </form>
  </div>
  )
}