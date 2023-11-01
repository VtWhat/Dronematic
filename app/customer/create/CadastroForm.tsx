'use client'
import { useState } from 'react'
import { Database } from '@/supabase'
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { z } from "zod";
import toast from 'react-hot-toast'
import { Button } from "@nextui-org/button";
import {Input} from "@nextui-org/input";
import { Divider } from '@nextui-org/react'

export default function CadastrarClientesForm({ session }: { session: Session | null }) {
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

  async function cadastrarCliente({
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

        let { error } = await supabase.from('clientes').insert({
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
          user_id: user?.id as string,
        })

        if (error) throw error

        toast.success('Cliente cadastrado!')
        router.prefetch("/customer/show")
        router.push("/home")

      } catch (error) {
        toast.error('Erro ao cadastrar cliente!')
        console.log(error)
      }
    }
  }

  return (
    <div className='flex justify-center p-4'>  
      <form
      className="bg-white flex flex-col justify-center items-center p-10 md:px-20 rounded-xl gap-4 shadow-2xl md:my-10">
          <label className="text-3xl font-sans font-bold text-black">Cadastro de Cliente</label>
          <Divider/>

          <Input isRequired label="Nome" size="sm" variant="faded" radius="full" onChange={(e) => setNome(e.target.value)}/>
          <Input isRequired label="Sobrenome" size="sm" variant="faded" radius="full" onChange={(e) => setSobrenome(e.target.value)}/>
          <Input isRequired label="Email" size="sm" variant="faded" radius="full" onChange={(e) => setEmail(e.target.value)}/>
          <Input isRequired label="Telefone" type="number" size="sm" variant="faded" radius="full" onChange={(e) => setTelefone_1(e.target.value)}/>
          <Input isRequired label="CPF" type="number" size="sm" variant="faded" radius="full" onChange={(e) => setCpf(e.target.value)}/>
          <Input isRequired label="Cidade" size="sm" variant="faded" radius="full" onChange={(e) => setCidade(e.target.value)}/>
          <Input isRequired label="Estado" size="sm" variant="faded" radius="full" onChange={(e) => setEstado(e.target.value)}/>
          <Input isRequired label="Bairro" size="sm" variant="faded" radius="full" onChange={(e) => setBairro(e.target.value)}/>
          <Input isRequired label="Rua" size="sm" variant="faded" radius="full" onChange={(e) => setRua(e.target.value)}/>
          <Input isRequired label="Numero" size="sm" variant="faded" radius="full" onChange={(e) => setNumero(e.target.value)}/>
          <Input isRequired label="CEP" type="number" size="sm" variant="faded" radius="full" onChange={(e) => setCep(e.target.value)}/>

          <Button color="primary" variant="shadow" radius="full" size="lg"
          onClick={() => cadastrarCliente({ nome, sobrenome, email, telefone_1, telefone_2, cpf, cidade, estado, bairro, rua, numero, cep })}>
            Cadastrar Cliente
          </Button>
      </form>
  </div>
  )
}