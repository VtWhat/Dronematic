// @ts-nocheck
'use client'
import { useCallback, useEffect, useState } from 'react'
import { Database } from '@/supabase'
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter, useSearchParams } from 'next/navigation'
import { z } from 'zod'
import toast from 'react-hot-toast'
import ReactCalendar from 'react-calendar'
import "components/styles/Calendar.css"

export default function UpdateServiceForm({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient<Database>()

  const user = session?.user
  const router = useRouter()
  const serviceID = Number(useSearchParams().get('servico_id'))

  //cliente
  const [nome, setNome] = useState<string>("")
  const [sobrenome, setSobrenome] = useState<string>("")
  const [email, setEmail] = useState<string>("")

  // serviço
  const [description, setDescription] = useState<string>("")
  const [route, setRoute] = useState<string>("")

  //local de voo
  const [cidade, setCidade] = useState<string>("")
  const [estado, setEstado] = useState<string>("")
  const [bairro, setBairro] = useState<string>("")
  const [rua, setRua] = useState<string>("")
  const [numero, setNumero] = useState<string>("")
  const [cep, setCep] = useState<string>("")

  //dia do voo
  const [diavoo, setDiavoo] = useState<Date>(new Date(2020,10,10))

  //config
  const [drone, setDrone] = useState<string>("")
  const [cam, setCam] = useState<string>("")
  const [filtro, setFiltro] = useState<string>("")
  const [aspect, setAspect] = useState<string>("")
  const [videoq, setVideoq] = useState<string>("")
  const [fov, setFov] = useState<string>("")
  const [eis, setEis] = useState<string>("")
  const [color, setColor] = useState<string>("")
  const [iso, setIso] = useState<string>("")
  const [isol, setIsol] = useState<string>("")
  const [shutter, setShutter] = useState<string>("")
  const [wb, setWb] = useState<string>("")

  const zodMinDate = new Date()
  zodMinDate.setDate(zodMinDate.getDate() - 1)

  const ServicoSchema = z.object({
    Cidade: 
      z.string().
      min(3, "Mínimo 3 caractéres").
      max(60, "Máximo 60 caractéres"),
    Estado: 
      z.string().
      length(2, "Insira somente a sigla do estado"),
    Bairro:
      z.string().
      min(2, "Mínimo 2 caractéres").
      max(60, "Máximo 60 caractéres"),
    Rua: 
      z.string().
      min(2, "Mínimo 2 caractéres").
      max(60, "Máximo 60 caractéres"),
    Numero: 
      z.string().
      min(1, "Mínimo 1 dígito").
      max(10, "Máximo 10 dígitos"),
    Cep: 
      z.string().
      length(8, "Deve ser composto por 8 dígitos"),
    Descrição: z.string({required_error: "Forneça uma descrição"}),
    Data: z.date().min(zodMinDate, {message: "Selecione uma Data"}),
    Drone: z.string().min(1, "Selecione o Drone"),
    Camera: z.string().min(1, "Selecione a Câmera")
    })

  const getService = useCallback(async () => {
    try {
      let { data, error, status } = await supabase
        .from("servicos")
        .select("*,clientes(nome,sobrenome,email),config(*)")
        .eq('servico_id', serviceID)
        .single()

    console.log(data)

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        //cliente
        setNome(data.clientes.nome)
        setSobrenome(data.clientes.sobrenome)
        setEmail(data.clientes.email)

        //serviço
        setDescription(data.description)
        setRoute(data.route)
        setCidade(data.cidade)
        setEstado(data.estado)
        setBairro(data.bairro)
        setRua(data.rua)
        setNumero(data.numero)
        setCep(data.cep)
        setDiavoo(new Date(data.date)) 

        //config
        setDrone(data.config.drone)
        setCam(data.config.camera)
        setFiltro(data.config.filter)
        setAspect(data.config.aspect_ratio)
        setVideoq(data.config.video_quality)
        setFov(data.config.fov)
        setEis(data.config.eis)
        setColor(data.config.color_mode)
        setIso(data.config.iso)
        setIsol(data.config.auto_iso_limit)
        setShutter(data.config.shutter)
        setWb(data.config.wb)
        
        {toast.success("Dados carregados!", {id:"upCliToast"})}
      }
    } catch (error) {
      toast.error('Error ao carregar dados do serviço!')
    } finally {
    }
  }, [user, supabase])

  useEffect(() => {
    getService()
  }, [user, getService])

  async function updateServico() {
    const servData = {
        Cidade: cidade,
        Estado: estado,
        Bairro: bairro,
        Rua: rua,
        Numero: numero,
        Cep: cep,
        Descrição: description,
        Data: diavoo,
        Drone: drone,
        Camera: cam
      }

    const result = ServicoSchema.safeParse(servData)
    if(!result.success){

      result.error.issues.forEach((issue) => {
        let errorMessage = ""

        errorMessage = issue.path + ": " + issue.message + ". ";
        toast.error(errorMessage)
      })

    }else{
      try {

        const { data, error } = await supabase.from('servicos').update({
            bairro: bairro,
            cep: cep,
            cidade: cidade,
            date: diavoo.toISOString(),
            description: description,
            estado: estado,
            numero: numero,
            route: route,
            rua: rua,
          }).eq("servico_id", serviceID).select().single()
  
        if ( !error ) {
          await supabase.from('config').update({
            drone: drone,
            camera: cam,
            filter: filtro,
            aspect_ratio: aspect,
            video_quality: videoq,
            fov: fov,
            eis: eis,
            color_mode: color,
            iso: iso,
            auto_iso_limit: isol,
            shutter: shutter,
            wb: wb,
          }).eq("servico_id",serviceID)
        }

        if (error) throw error

        router.prefetch("/service/show")
        toast.success('Dados do Serviço atualizados!')
        router.push("/service/show")

      } catch (error) {
        toast.error('Erro ao atualizar dados do serviço!')
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
      <div className="flex flex-col">
          <label htmlFor="desc">Descrição</label>
          <input
            id="desc"
            type="text"
            value={description || ""}
            placeholder="O que deve ser feito"
            className="bg-zinc-200 rounded-md px-2"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="route">Rota de voo</label>
          <input
            id="route"
            type="text"
            value={route || ""}
            placeholder="A rota a ser seguida"
            className="bg-zinc-200 rounded-md px-2"
            onChange={(e) => setRoute(e.target.value)}
          />
        </div>
    </div>

    <div>Local de Voo

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
    </div>

    <div className="flex flex-col items-center justify-center">Data
    <label>Selecionado:</label>
    {diavoo.toDateString()}
      <ReactCalendar
        minDate={new Date()}
        className='REACT-CALENDAR p-2'
        view='month'
        defaultValue={new Date(2017, 0, 1)}
        value={diavoo}
        onClickDay={(date) => setDiavoo(date)}
       />
    </div>

    <div>Especificações

    <div className="flex flex-col">
      <label htmlFor="drone">Drone</label>
      <select
        id="drone"
        value={drone || ''}
        className="bg-zinc-200 rounded-md px-2"
        onChange={(e) => setDrone(e.target.value)}
      >
        <option value="NA" selected hidden>Selecione uma opção</option>
        <option value="DJI Avata">DJI Avata</option>
        <option value="DJI FPV">DJI FPV</option>
        <option value="DJI Mavic Mini">DJI Mavic Mini</option>
        <option value="DJI Mini SE">DJI Mini SE</option>
        <option value="DJI Mini 2">DJI Mini 2</option>
        <option value="DJI Mini 2 SE">DJI Mini 2 SE</option>
        <option value="DJI Mini 3">DJI Mini 3</option>
        <option value="DJI Mini 3 Pro">DJI Mini 3 Pro</option>
        <option value="DJI Mini 4 Pro">DJI Mini 4 Pro</option>
        <option value="Outro">Outro</option>

      </select>
    </div>

    <div className="flex flex-col">
      <label htmlFor="camera">Câmera</label>
      <select
        id="cam"
        value={cam || ''}
        className="bg-zinc-200 rounded-md px-2"
        onChange={(e) => setCam(e.target.value)}
      >
        <option value="NA" selected hidden>Selecione uma opção</option>
        <option value="Câmera do Drone">Câmera do Drone</option>
        <option value="GoPro 12">GoPro 12</option>
        <option value="GoPro 11">GoPro 11</option>
        <option value="GoPro 10">GoPro 10</option>
        <option value="GoPro 9">GoPro 9</option>
        <option value="GoPro 8">GoPro 8</option>
        <option value="GoPro 7">GoPro 7</option>
        <option value="GoPro 6">GoPro 6</option>
        <option value="GoPro 5">GoPro 5</option>
        <option value="Outro">Outro</option>
      </select>
    </div>

    <div className="flex flex-col">
      <label htmlFor="filtro">Filtro</label>
      <select
        id="filtro"
        value={filtro || ''}
        className="bg-zinc-200 rounded-md px-2"
        onChange={(e) => setFiltro(e.target.value)}
      >
        <option value="NA" selected hidden>Selecione uma opção</option>
        <option value="ND2">ND2</option>
        <option value="ND4">ND4</option>
        <option value="ND8">ND8</option>
        <option value="ND16">ND16</option>
        <option value="ND32">ND32</option>
        <option value="ND64">ND64</option>
        <option value="CPL">CPL</option>
        <option value="UV">UV</option>
        <option value="Sem Filtro">Sem Filtro</option>
      </select>
    </div>

    <div className="flex flex-col">
      <label htmlFor="aspect">Aspect Ratio <small>opcional</small></label>
      <select
        id="aspect"
        value={aspect || ''}
        className="bg-zinc-200 rounded-md px-2"
        onChange={(e) => setAspect(e.target.value)}
      >
        <option value="NA" selected hidden>Selecione uma opção</option>
        <option value="4:3">4:3</option>
        <option value="3:2">3:2</option>
        <option value="16:9">16:9</option>
        <option value="21:9">21:9</option>
      </select>
    </div>

    <div className="flex flex-col">
      <label htmlFor="videoq">Vídeo Quality <small>opcional</small></label>
      <select
        id="videoq"
        value={videoq || ''}
        className="bg-zinc-200 rounded-md px-2"
        onChange={(e) => setVideoq(e.target.value)}
      >
        <option value="NA" selected hidden>Selecione uma opção</option>
        <option value="4K@60fps">4K@60fps</option>
        <option value="4K@50fps">4K@50fps</option>
        <option value="4K@30fps">4K@30fps</option>
        <option value="2.7K@120fps">2.7K@120fps</option>
        <option value="2.7K@100fps">2.7K@100fps</option>
        <option value="2.7K@60fps">2.7K@60fps</option>
        <option value="2.7K@50fps">2.7K@50fps</option>
        <option value="2.7K@30fps">2.7K@30fps</option>
        <option value="1080p@120fps">1080p@120fps</option>
        <option value="1080p@100fps">1080p@100fps</option>
        <option value="1080p@60fps">1080p@60fps</option>
        <option value="1080p@50fps">1080p@50fps</option>
        <option value="1080p@30fps">1080p@30fps</option>
      </select>
    </div>

    <div className="flex flex-col">
      <label htmlFor="fov">FOV <small>opcional</small></label>
      <select
        id="fov"
        value={fov || ''}
        className="bg-zinc-200 rounded-md px-2"
        onChange={(e) => setFov(e.target.value)}
      >
        <option value="NA" selected hidden>Selecione uma opção</option>
        <option value="Normal">Normal</option>
        <option value="Wide">Wide</option>
        <option value="Ultra Wide">Ultra Wide</option>
      </select>
    </div>

    <div className="flex flex-col">
      <label htmlFor="eis">EIS <small>opcional</small></label>
      <select
        id="eis"
        value={eis || ''}
        className="bg-zinc-200 rounded-md px-2"
        onChange={(e) => setEis(e.target.value)}
      >
        <option value="NA" selected hidden>Selecione uma opção</option>
        <option value="RockSteady">RockSteady</option>
        <option value="HorizonSteady">HorizonSteady</option>
        <option value="Gyroflow">Gyroflow</option>
        <option value="Nenhum">Nenhum</option>
      </select>
    </div>

    <div className="flex flex-col">
      <label htmlFor="color">Color Mode <small>opcional</small></label>
      <select
        id="color"
        value={color || ''}
        className="bg-zinc-200 rounded-md px-2"
        onChange={(e) => setColor(e.target.value)}
      >
        <option value="NA" selected hidden>Selecione uma opção</option>
        <option value="Standard">Standard</option>
        <option value="D-Cinelike">D-Cinelike</option>
      </select>
    </div>

    <div className="flex flex-col">
      <label htmlFor="iso">ISO <small>opcional</small></label>
      <select
        id="iso"
        value={iso || ''}
        className="bg-zinc-200 rounded-md px-2"
        onChange={(e) => setIso(e.target.value)}
      >
        <option value="NA" selected hidden>Selecione uma opção</option>
        <option value="100">100</option>
        <option value="200">200</option>
        <option value="400">400</option>
        <option value="800">800</option>
        <option value="1600">1600</option>
        <option value="3200">3200</option>
        <option value="6400">6400</option>
        <option value="12800">12800</option>
        <option value="25600">25600</option>
        <option value="Auto">Auto</option>
      </select>
    </div>

    <div className="flex flex-col">
      <label htmlFor="isol">Auto ISO Limit <small>opcional</small></label>
      <select
        id="isol"
        value={isol || ''}
        className="bg-zinc-200 rounded-md px-2"
        onChange={(e) => setIsol(e.target.value)}
      >
        <option value="NA" selected hidden>Selecione uma opção</option>
        <option value="100">100</option>
        <option value="200">200</option>
        <option value="400">400</option>
        <option value="800">800</option>
        <option value="1600">1600</option>
        <option value="3200">3200</option>
        <option value="6400">6400</option>
      </select>
    </div>

    <div className="flex flex-col">
      <label htmlFor="shutter">Shutter Speed <small>opcional</small></label>
      <select
        id="shutter"
        value={shutter || ''}
        className="bg-zinc-200 rounded-md px-2"
        onChange={(e) => setShutter(e.target.value)}
      >
        <option value="NA" selected hidden>Selecione uma opção</option>
        <option value="1/60">1/60</option>
        <option value="1/80">1/80</option>
        <option value="1/100">1/100</option>
        <option value="1/120">1/120</option>
        <option value="1/160">1/160</option>
        <option value="1/200">1/200</option>
        <option value="1/240">1/240</option>
        <option value="1/320">1/320</option>
        <option value="1/400">1/400</option>
        <option value="1/500">1/500</option>
        <option value="1/640">1/640</option>
      </select>
    </div>

    <div className="flex flex-col">
      <label htmlFor="wb">White Balance <small>opcional</small></label>
      <select
        id="wb"
        value={wb || ''}
        className="bg-zinc-200 rounded-md px-2"
        onChange={(e) => setWb(e.target.value)}
      >
        <option value="NA" selected hidden>Selecione uma opção</option>
        <option value="6000K">6000K</option>
        <option value="5900K">5900K</option>
        <option value="5800K">5800K</option>
        <option value="5700K">5700K</option>
        <option value="5600K">5600K</option>
        <option value="5500K">5500K</option>
        <option value="5400K">5400K</option>
        <option value="5300K">5300K</option>
        <option value="5200K">5200K</option>
        <option value="5100K">5100K</option>
        <option value="5000K">5000K</option>
        <option value="Auto">Auto</option>
      </select>
    </div>
  </div>

        <button
            className="py-2 px-4 rounded-md no-underline bg-black hover:bg-green-900 text-white"
            onClick={() => updateServico()}
        >
          Salvar
        </button>
    </div>
  )
}