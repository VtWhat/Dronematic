'use client'
import { useCallback, useEffect } from 'react'
import useState from 'react-usestateref'
import { Database } from '@/supabase'
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter, useSearchParams } from 'next/navigation'
import { z } from "zod";
import toast from 'react-hot-toast'
import ReactCalendar from 'react-calendar'
import "components/styles/Calendar.css"
import { Button } from "@nextui-org/button";
import {Input} from "@nextui-org/input";
import { Divider } from '@nextui-org/react'
import {Select, SelectItem} from "@nextui-org/select";
import {Textarea} from "@nextui-org/react";

export default function CadastrarServicoForm({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient<Database>()

  const clienteID = Number(useSearchParams().get('cliente_id'))
  const categoria = String(useSearchParams().get('cat'))

  //dia do voo
  const [diavoo, setDiavoo] = useState<Date>(new Date(2020,10,10))

  //Forecast
  const [lat, setLat, latRef] = useState<number>();
  const [long, setLong, longRef] = useState<number>();
  const [forecastData, setForecast, forecastRef] = useState<any>();

  const getForecastData = async () => {
      const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latRef.current}&longitude=${longRef.current}&current=temperature_2m,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max,windspeed_10m_max&timezone=America%2FSao_Paulo&forecast_days=16`);
      const Forecast = await res.json()
      setForecast(Forecast)
  }

  useEffect(() => {
      if('geolocation' in navigator) {
          // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
          navigator.geolocation.getCurrentPosition(({ coords }) => {
              const { latitude, longitude } = coords;
              setLat(latitude);
              setLong(longitude)
              getForecastData()
          })
      }
  }, []);

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

  //select options
  const droneOptions: string[] = [
    "DJI Avata",
    "DJI FPV",
    "DJI Mavic Mini",
    "DJI Mini SE",
    "DJI Mini 2",
    "DJI Mini 2 SE",
    "DJI Mini 3",
    "DJI Mini 3 Pro",
    "DJI Mini 4 Pro",
    "Outro",  
  ]

  const cameraOptions: string[] = [
    "Câmera do Drone",
    "GoPro 12",
    "GoPro 11",
    "GoPro 10",
    "GoPro 9",
    "GoPro 8",
    "GoPro 7",
    "GoPro 6",
    "GoPro 5",
    "Outro",
  ]

  const filterOptions: string[] = [
    "ND2",
    "ND4",
    "ND8",
    "ND16",
    "ND32",
    "ND64",
    "CPL",
    "UV",
    "Sem Filtro",
  ]

  const aspectOptions: string[] = [
    "4:3",
    "3:2",
    "16:9",
    "21:9",
  ]

  const videoqOptions: string[] = [
    "4K@60fps",
    "4K@50fps",
    "4K@30fps",
    "2.7K@120fps",
    "2.7K@100fps",
    "2.7K@60fps",
    "2.7K@50fps",
    "2.7K@30fps",
    "1080p@120fps",
    "1080p@100fps",
    "1080p@60fps",
    "1080p@50fps",
    "1080p@30fps",
  ]

  const fovOptions: string[] = [
    "Normal",
    "Wide",
    "Ultra Wide",
  ]

  const colorOptions: string[] = [
    "Standard",
    "D-Cinelike",
  ]

  const eisOptions: string[] = [
    "RockSteady",
    "HorizonSteady",
    "Gyroflow",
    "Nenhum",
  ]

  const isoOptions: string[] = [
    "100",
    "200",
    "400",
    "800",
    "1600",
    "3200",
    "6400",
    "12800",
    "25600",
    "Auto",
  ]

  const isolOptions: string[] = [
    "100",
    "200",
    "400",
    "800",
    "1600",
    "3200",
    "6400",
  ]

  const shutterOptions: string[] = [
    "1/60",
    "1/80",
    "1/100",
    "1/120",
    "1/160",
    "1/200",
    "1/240",
    "1/320",
    "1/400",
    "1/500",
    "1/640",
  ]

  const wbOptions: string[] = [
      "6000K",
      "5900K",
      "5800K",
      "5700K",
      "5600K",
      "5500K",
      "5400K",
      "5300K",
      "5200K",
      "5100K",
      "5000K",
      "Auto",
  ]

  const user = session?.user
  const router = useRouter()

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

  async function cadastrarServico() {

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
        const { data, error } = await supabase.from('servicos').insert({
          cliente_id: clienteID,
          categoria: categoria,
          user_id: user?.id as string,
          bairro: bairro,
          cep: cep,
          cidade: cidade,
          date: diavoo.toISOString(),
          description: description,
          estado: estado,
          numero: numero,
          route: route,
          rua: rua,
        }).select().single()

      if ( !error ) {
        await supabase.from('config').insert({
          servico_id: data.servico_id,
          user_id: user?.id as string,
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
        })
      }

        if (error) throw error

        toast.success('Serviço cadastrado!')
        router.prefetch("/service/show")
        router.push("/home")

      } catch (error) {
        toast.error('Erro ao cadastrar serviço!')
        console.log(error)
      }
    }
  }

  return (
    <div className='w-full flex flex-col justify-center items-center'>  
      <form
      className="bg-white flex flex-col justify-center items-center py-10 px-24 rounded-xl gap-4 shadow-2xl my-10">
          <label className="text-3xl font-sans font-bold text-black">Cadastro de Serviço</label>
          <Divider />
          <p>Cliente</p>
          <Input isReadOnly label="Cliente" size="sm" variant="faded" radius="full" value={nome + " " + sobrenome}/>
          <Input isReadOnly label="Email" size="sm" variant="faded" radius="full" value={email}/>
          <Divider />
          <p>Detalhes</p>
          <Textarea isRequired label="Descrição" size="sm" variant="faded" minRows={1} radius="lg" onChange={(e) => setDescription(e.target.value)}/>
          <Textarea label="Detalhes de Rota" size="sm" variant="faded" radius="lg" minRows={1} onChange={(e) => setRoute(e.target.value)}/>
          <Divider />
          <p>Local</p>
          <Input isRequired label="Cidade" size="sm" variant="faded" radius="full" onChange={(e) => setCidade(e.target.value)}/>
          <Input isRequired label="Estado" size="sm" variant="faded" radius="full" onChange={(e) => setEstado(e.target.value)}/>
          <Input isRequired label="Bairro" size="sm" variant="faded" radius="full" onChange={(e) => setBairro(e.target.value)}/>
          <Input isRequired label="Rua" size="sm" variant="faded" radius="full" onChange={(e) => setRua(e.target.value)}/>
          <Input isRequired label="Numero" size="sm" variant="faded" radius="full" onChange={(e) => setNumero(e.target.value)}/>
          <Input isRequired label="CEP" type="number" size="sm" variant="faded" radius="full" onChange={(e) => setCep(e.target.value)}/>
          <Divider />
          <p>Data</p>
          <ReactCalendar
          minDate={new Date()}
          className='REACT-CALENDAR p-2'
          view='month'
          defaultValue={new Date(2017, 0, 1)}
          onClickDay={(date) => setDiavoo(date)}
          tileClassName={({ date, view }) => {
            if (
                view === 'month' &&
                date.getDate() === diavoo.getDate() &&
                date.getMonth() === diavoo.getMonth() &&
                date.getFullYear() === diavoo.getFullYear()
              ) {
                return 'highlight_selected';
              }

            for(let i = 0; i < forecastData?.daily.time.length; i++){
              if (
                date.getUTCDate() === new Date(forecastData?.daily.time[i]).getUTCDate() &&
                date.getUTCMonth() === new Date(forecastData?.daily.time[i]).getUTCMonth() &&
                date.getUTCFullYear() === new Date(forecastData?.daily.time[i]).getUTCFullYear()
            ) {
                if(forecastData?.daily.precipitation_probability_max[i] == 0){
                  return 'forecast_0'
                } else
                if(forecastData?.daily.precipitation_probability_max[i] > 0 && forecastData?.daily.precipitation_probability_max[i] <= 10){
                  return 'forecast_10'
                } else
                if(forecastData?.daily.precipitation_probability_max[i] > 10 && forecastData?.daily.precipitation_probability_max[i] <= 20){
                  return 'forecast_20'
                } else 
                if(forecastData?.daily.precipitation_probability_max[i] > 20 && forecastData?.daily.precipitation_probability_max[i] <= 30){
                  return 'forecast_30'
                } else
                if(forecastData?.daily.precipitation_probability_max[i] > 30 && forecastData?.daily.precipitation_probability_max[i] <= 40){
                  return 'forecast_40'
                } else 
                if(forecastData?.daily.precipitation_probability_max[i] > 40 && forecastData?.daily.precipitation_probability_max[i] <= 50){
                  return 'forecast_50'
                } else
                if(forecastData?.daily.precipitation_probability_max[i] > 50 && forecastData?.daily.precipitation_probability_max[i] <= 60){
                  return 'forecast_60'
                } else
                if(forecastData?.daily.precipitation_probability_max[i] > 60 && forecastData?.daily.precipitation_probability_max[i] <= 70){
                  return 'forecast_70'
                }
                if(forecastData?.daily.precipitation_probability_max[i] > 70 && forecastData?.daily.precipitation_probability_max[i] <= 80){
                  return 'forecast_80'
                }
                if(forecastData?.daily.precipitation_probability_max[i] > 80 && forecastData?.daily.precipitation_probability_max[i] <= 90){
                  return 'forecast_90'
                }
                if(forecastData?.daily.precipitation_probability_max[i] > 90){
                  return 'forecast_100'
                }
            }
            }
          }}
        />
          <Divider />
          <p>Especificações</p>
          <Select isRequired label="Drone" radius="full" variant='faded' size='sm' onChange={(e) => setDrone(e.target.value)}>
            {droneOptions.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </Select>

          <Select isRequired label="Câmera" radius="full" variant='faded' size='sm' onChange={(e) => setCam(e.target.value)}>
            {cameraOptions.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </Select>

          <Select label="Filtro de Lente" radius="full" variant='faded' size='sm' onChange={(e) => setFiltro(e.target.value)}>
            {filterOptions.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </Select>

          <Select label="Aspect Ratio (Taxa de Proporção)" radius="full" variant='faded' size='sm' onChange={(e) => setAspect(e.target.value)}>
            {aspectOptions.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </Select>

          <Select label="Qualidade do Vídeo" radius="full" variant='faded' size='sm' onChange={(e) => setVideoq(e.target.value)}>
            {videoqOptions.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </Select>

          <Select label="FOV (Campo de Visão)" radius="full" variant='faded' size='sm' onChange={(e) => setFov(e.target.value)}>
            {fovOptions.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </Select>

          <Select label="EIS (Estabilização de Imagem)" radius="full" variant='faded' size='sm' onChange={(e) => setEis(e.target.value)}>
            {eisOptions.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </Select>

          <Select label="Color Mode (Modo de Cor)" radius="full" variant='faded' size='sm' onChange={(e) => setColor(e.target.value)}>
            {colorOptions.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </Select>

          <Select label="ISO (Sensibilidade a Luz)" radius="full" variant='faded' size='sm' onChange={(e) => setIso(e.target.value)}>
            {isoOptions.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </Select>

          <Select label="Auto ISO Limit (Limite de ISO)" radius="full" variant='faded' size='sm' onChange={(e) => setIsol(e.target.value)}>
            {isolOptions.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </Select>
          
          <Select label="Shutter Speed (Velocidade do Obturador)" radius="full" variant='faded' size='sm' onChange={(e) => setShutter(e.target.value)}>
            {shutterOptions.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </Select>

          <Select label="White Balance (Balanço Branco)" radius="full" variant='faded' size='sm' onChange={(e) => setWb(e.target.value)}>
            {wbOptions.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </Select>

          <Button color="primary" variant="shadow" radius="full" size="lg"
          onClick={() => cadastrarServico()}>
            Cadastrar Serviço
          </Button>
      </form>
  </div>  
  )
}