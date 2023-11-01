'use client'
import { useCallback, useEffect, useState } from 'react'
import { Database } from '@/supabase'
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter, useSearchParams } from 'next/navigation'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { Button, Divider, Input } from '@nextui-org/react'

export default function UpdateClienteForm({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient<Database>()

  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const [nome, setNome] = useState<string>("")
  const [sobrenome, setSobrenome] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [telefone_1, setTelefone_1] = useState<string>("")
  const [telefone_2, setTelefone_2] = useState<string | null>("")
  const [cpf, setCpf] = useState<string>("")
  const [cidade, setCidade] = useState<string>("")
  const [estado, setEstado] = useState<string>("")
  const [bairro, setBairro] = useState<string>("")
  const [rua, setRua] = useState<string>("")
  const [numero, setNumero] = useState<string>("")
  const [cep, setCep] = useState<string>("")

  const user = session?.user
  const router = useRouter()
  const clienteID = Number(useSearchParams().get('cliente_id'))

  const ClienteSchema = z.object({
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
    Telefone_1: 
      z.string().
      min(8, "Mínimo 8 digitos").
      max(15, "Máximo 15 digitos"),
    Telefone_2: 
      z.string().
      optional(),
    CPF: 
      z.string().
      length(11, "Deve ser composto por 11 digitos"),
    Cidade: 
      z.string().
      min(3, "Mínimo 3 caractéres").
      max(60, "Máximo 60 caractéres").
      toUpperCase(),
    Estado: 
      z.string().
      length(2, "Insira somente a sigla do estado").
      toUpperCase(),
    Bairro: 
      z.string().
      min(2, "Mínimo 2 caractéres").
      max(60, "Máximo 60 caractéres").
      toUpperCase(),
    Rua: 
      z.string().
      min(2, "Mínimo 2 caractéres").
      max(60, "Máximo 60 caractéres").
      toUpperCase(),
    Numero: 
      z.string().
      min(1, "Mínimo 1 dígito").
      max(10, "Máximo 10 dígitos"),
    Cep: 
      z.string().
      length(8, "Deve ser composto por 8 dígitos"),
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
        setSobrenome(data.sobrenome)
        setEmail(data.email)
        setTelefone_1(data.telefone_1)
        setTelefone_2(data.telefone_2)
        setCpf(data.cpf)
        setCidade(data.cidade)
        setEstado(data.estado)
        setBairro(data.bairro)
        setRua(data.rua)
        setNumero(data.numero)
        setCep(data.cep)
        setIsLoaded(true)
        
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
    sobrenome,
    email,
    telefone_1,
    telefone_2,
    cpf,
    cidade,
    bairro,
    estado,
    rua,
    numero,
    cep,
  }: {
    bairro: string
    cep: string
    cidade: string
    cpf: string
    email: string
    estado: string
    nome: string
    numero: string
    rua: string
    sobrenome: string
    telefone_1: string
    telefone_2?: string | null
  }) {

    const clienteData = {
      Nome: nome,
      Sobrenome: sobrenome,
      Email: email,
      Telefone_1: telefone_1,
      Telefone_2: telefone_2,
      CPF: cpf,
      Cidade: cidade,
      Estado: estado,
      Bairro: bairro,
      Rua: rua,
      Numero: numero,
      Cep: cep
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
          sobrenome: clienteData.Sobrenome,
          email: clienteData.Email,
          telefone_1: clienteData.Telefone_1,
          telefone_2: clienteData.Telefone_2,
          cpf: clienteData.CPF,
          cidade: clienteData.Cidade,
          estado: clienteData.Estado,
          bairro: clienteData.Bairro,
          rua: clienteData.Rua,
          numero: clienteData.Numero,
          cep: clienteData.Cep,
          updated_at: new Date().toISOString(),
        })
        .eq("cliente_id", clienteID)

        if (error) throw error

        router.prefetch("/customer/show")
        toast.success('Dados do Cliente atualizados!')
        router.push("/customer/show")

      } catch (error) {
        toast.error('Erro ao atualizar dados do cliente!')
      }
    }
  }

  return (
    <div className='w-full flex flex-col justify-center items-center'>  
      <form
      className="bg-white flex flex-col justify-center items-center py-10 px-24 rounded-xl gap-4 shadow-2xl my-10">
          <label className="text-3xl font-sans font-bold text-black">Atualização de Cliente</label>
          <Divider/>

          <Input isRequired label="Nome" size="sm" variant="faded" radius="full" value={nome} onChange={(e) => setNome(e.target.value)}/>
          <Input isRequired label="Sobrenome" size="sm" variant="faded" radius="full" value={sobrenome} onChange={(e) => setSobrenome(e.target.value)}/>
          <Input isRequired label="Email" size="sm" variant="faded" radius="full" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <Input isRequired label="Telefone" type="number" size="sm" variant="faded" radius="full" value={telefone_1} onChange={(e) => setTelefone_1(e.target.value)}/>
          <Input isRequired label="CPF" type="number" size="sm" variant="faded" radius="full" value={cpf} onChange={(e) => setCpf(e.target.value)}/>
          <Input isRequired label="Cidade" size="sm" variant="faded" radius="full" value={cidade} onChange={(e) => setCidade(e.target.value)}/>
          <Input isRequired label="Estado" size="sm" variant="faded" radius="full" value={estado} onChange={(e) => setEstado(e.target.value)}/>
          <Input isRequired label="Bairro" size="sm" variant="faded" radius="full" value={bairro} onChange={(e) => setBairro(e.target.value)}/>
          <Input isRequired label="Rua" size="sm" variant="faded" radius="full" value={rua} onChange={(e) => setRua(e.target.value)}/>
          <Input isRequired label="Numero" size="sm" variant="faded" radius="full" value={numero} onChange={(e) => setNumero(e.target.value)}/>
          <Input isRequired label="CEP" type="number" size="sm" variant="faded" radius="full" value={cep} onChange={(e) => setCep(e.target.value)}/>

          <Button color="primary" variant="shadow" radius="full" size="lg" isLoading={!isLoaded}
          onClick={() => updateCliente({ nome, sobrenome, email, telefone_1, telefone_2, cpf, cidade, estado, bairro, rua, numero, cep })}>
            Atualizar Cliente
          </Button>
      </form>
  </div>
  )
}