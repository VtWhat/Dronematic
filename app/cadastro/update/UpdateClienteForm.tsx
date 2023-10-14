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
          type="name"
          value={nome || ''}
          className="bg-zinc-200 rounded-md px-2"
          placeholder="João Vitor"
          onChange={(e) => setNome(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="sobrenome">Sobrenome</label>
        <input
          id="sobrenome"
          type="sobrenome"
          value={sobrenome || ''}
          className="bg-zinc-200 rounded-md px-2"
          placeholder="Helm"
          onChange={(e) => setSobrenome(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="url"
          value={email || ''}
          placeholder="jvthelms@gmail.com"
          className="bg-zinc-200 rounded-md px-2"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="telefone_1">Telefone 1</label>
        <input
          id="telefone_1"
          type="number"
          value={telefone_1 || ""}
          placeholder="51995605886"
          className="bg-zinc-200 rounded-md px-2"
          onChange={(e) => setTelefone_1(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="telefone_2">Telefone 2</label>
        <input
          id="telefone_2"
          type="number"
          value={telefone_2|| ""}
          placeholder="Opcional"
          className="bg-zinc-200 rounded-md px-2"
          onChange={(e) => setTelefone_2(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="cpf">CPF</label>
        <input
          id="cpf"
          type="number"
          value={cpf || ""}
          placeholder="60069515093"
          className="bg-zinc-200 rounded-md px-2"
          onChange={(e) => setCpf(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="cidade">Cidade</label>
        <input
          id="cidade"
          type="text"
          value={cidade || ""}
          placeholder="Gravataí"
          className="bg-zinc-200 rounded-md px-2"
          onChange={(e) => setCidade(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="estado">Estado</label>
        <input
          id="estado"
          type="text"
          value={estado || ""}
          placeholder="RS"
          className="bg-zinc-200 rounded-md px-2"
          onChange={(e) => setEstado(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="bairro">Bairro</label>
        <input
          id="bairro"
          type="text"
          value={bairro || ""}
          placeholder="Sítio Gaúcho"
          className="bg-zinc-200 rounded-md px-2"
          onChange={(e) => setBairro(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="rua">Rua</label>
        <input
          id="rua"
          type="text"
          value={rua || ""}
          placeholder="Rua Comandante Zero"
          className="bg-zinc-200 rounded-md px-2"
          onChange={(e) => setRua(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="numero">Numero</label>
        <input
          id="numero"
          type="number"
          value={numero || ""}
          placeholder="46"
          className="bg-zinc-200 rounded-md px-2"
          onChange={(e) => setNumero(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="cep">CEP</label>
        <input
          id="cep"
          type="number"
          value={cep || ""}
          placeholder="94195060"
          className="bg-zinc-200 rounded-md px-2"
          onChange={(e) => setCep(e.target.value)}
        />
      </div>

        <button
            className="py-2 px-4 rounded-md no-underline bg-black hover:bg-green-900 text-white"
            onClick={() => updateCliente({ nome, sobrenome, email, telefone_1, telefone_2, cpf, cidade, estado, bairro, rua, numero, cep })}
        >
          Salvar
        </button>
    </div>
  )
}