// @ts-nocheck
"use client"

import { Database } from "@/supabase"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCallback, useEffect } from "react"
import useState from "react-usestateref"
import toast from "react-hot-toast"
import jsPDFInvoiceTemplate from "app/service/show/jsPDFInvoiceTemplate.js"

export default function Botoes(data: { servico_id: any, u_email: string}) {
    const supabase = createClientComponentClient<Database>()
    const router = useRouter()

    const sid = data.servico_id

    const [lat, setLat] = useState<number>();
    const [long, setLong] = useState<number>();

    useEffect(() => {
        if('geolocation' in navigator) {
            // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
            navigator.geolocation.getCurrentPosition(({ coords }) => {
                const { latitude, longitude } = coords;
                setLat(latitude);
                setLong(longitude)
            })
        }
    }, []);

    const handleDelete = async (id: any) => {
        const res = await supabase.from("servicos").delete().eq("servico_id", id)
        toast.success("Serviço excluido!")
        router.refresh()
      }

    //cliente
    const [nome, setNome, nomeRef] = useState<string>("")
    const [sobrenome, setSobrenome, sobrenomeRef] = useState<string>("")
    const [email, setEmail, emailRef] = useState<string>("")
    const [telefone, setTelefone, telefoneRef] = useState<string>("")
    const [cidadecli, setCidadecli, cidadecliRef] = useState<string>("")
    const [estadocli, setEstadocli, estadocliRef] = useState<string>("")
    const [bairrocli, setBairrocli, bairrocliRef] = useState<string>("")
    const [ruacli, setRuacli, ruacliRef] = useState<string>("")
    const [numerocli, setNumerocli, numerocliRef] = useState<string>("")
    const [cepcli, setCepcli, cepcliRef] = useState<string>("")

    // serviço
    const [description, setDescription, descriptionRef] = useState<string>("")
    const [route, setRoute, routeRef] = useState<string>("")
    const [cat, setCat, catRef] = useState<string>("")

    //local de voo
    const [cidade, setCidade, cidadeRef] = useState<string>("")
    const [estado, setEstado, estadoRef] = useState<string>("")
    const [bairro, setBairro, bairroRef] = useState<string>("")
    const [rua, setRua, ruaRef] = useState<string>("")
    const [numero, setNumero, numeroRef] = useState<string>("")
    const [cep, setCep, cepRef] = useState<string>("")

    //dia do voo
    const [diavoo, setDiavoo, diavooRef] = useState<Date>(new Date(2020,10,10))

    //config
    const [drone, setDrone, droneRef] = useState<string>("")
    const [cam, setCam, camRef] = useState<string>("")
    const [filtro, setFiltro, filtroRef] = useState<string>("")
    const [aspect, setAspect, aspectRef] = useState<string>("")
    const [videoq, setVideoq, videoqRef] = useState<string>("")
    const [fov, setFov, fovRef] = useState<string>("")
    const [eis, setEis, eisRef] = useState<string>("")
    const [color, setColor, colorRef] = useState<string>("")
    const [iso, setIso, isoRef] = useState<string>("")
    const [isol, setIsol, isolRef] = useState<string>("")
    const [shutter, setShutter, shutterRef] = useState<string>("")
    const [wb, setWb, wbRef] = useState<string>("")

    //user
    const [user_name, setUser_name, user_nameRef] = useState<string>("")
    const [user_address, setUser_address, user_addressRef] = useState<string>("")
    const [user_cell, setUser_cell, user_cellRef] = useState<string>("")
    const [user_website, setUser_website, user_websiteRef] = useState<string | null>("")
    const [user_email, setUser_email, user_emailRef] = useState<string>(data.u_email)

    const getServiceData = useCallback(async () => {
        const { data } = await supabase.from("servicos").select("*,clientes(*),config(*)").eq("servico_id", sid).single()
        const { data: user_data } = await supabase.from("userprofile").select("*").single()

        if ( data ){           
            //cliente
            setNome(data.clientes.nome)
            setSobrenome(data.clientes.sobrenome)
            setEmail(data.clientes.email)
            setTelefone(data.clientes.telefone_1)
            setCidadecli(data.clientes.cidade)
            setEstadocli(data.clientes.estado)
            setBairrocli(data.clientes.bairro)
            setRuacli(data.clientes.rua)
            setNumerocli(data.clientes.numero)
            setCepcli(data.clientes.cep)

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
            setCat(data.categoria)

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

            //user
            setUser_name(user_data?.nome)
            setUser_address(user_data?.endereco)
            setUser_cell(user_data?.telefone)
            setUser_website(user_data?.website)
        }
      }, [ supabase])
    
      useEffect(() => {
        getServiceData()
      }, [ getServiceData])

    const genPDF = async (id: any) => {
            const pdfObject = {
                outputType: "dataurlnewwindow",
                returnJsPDFDocObject: false,
                fileName: nomeRef.current + "-" + sobrenomeRef.current + "(" + new Date().toDateString() + ")",
                orientationLandscape: false,
                compress: true,
                logo: {
                    src: "/dronematic-logo.png",
                    type: 'PNG', //optional, when src= data:uri (nodejs case)
                    width: 70, //aspect ratio = width/height
                    height: 26.66,
                    margin: {
                        top: 0, //negative or positive num, from the current position
                        left: 0 //negative or positive num, from the current position
                    }
                },
                stamp: {
                    inAllPages: true, //by default = false, just in the last page
                    src: "/qrcode.png",
                    type: 'PŃG', //optional, when src= data:uri (nodejs case)
                    width: 20, //aspect ratio = width/height
                    height: 20,
                    margin: {
                        top: 0, //negative or positive num, from the current position
                        left: 0 //negative or positive num, from the current position
                    }
                },
                business: {
                    name: user_nameRef.current,
                    address: user_addressRef.current,
                    phone: user_cellRef.current,
                    email: user_emailRef.current,
                    website: user_websiteRef.current,
                },
                contact: {
                    label: "Ordem de serviço emitida para:",
                    name: nomeRef.current + " " + sobrenomeRef.current,
                    address: ruacliRef.current + ", " + numerocliRef.current + ", " + bairrocliRef.current + ", " + cidadecliRef.current + ", " + estadocliRef.current + ", " + cepcliRef.current,
                    phone: telefoneRef.current,
                    email: emailRef.current,
                    otherInfo: "",
                },
                invoice: {
                    label: "Serviço#",
                    num:data.servico_id,
                    invDate: 'Agendado: ' + diavooRef.current.toDateString(),
                    invGenDate: "Emitido: " + new Date().toDateString(),
                    headerBorder: false,
                    tableBodyBorder: false,
                    header: [
                    {
                        title: "", 
                        style: { 
                        width: 30
                        } 
                    }, 
                    { 
                        title: "",
                        style: {
                        width: 160
                        } 
                    }
                    ],
                    table: Array.from(Array(
                        ["Categoria",catRef.current],
                        ["Descrição",descriptionRef.current],
                        ["Rota",routeRef.current],
                        ["Local de voo",ruaRef.current + ", " + numeroRef.current + ", " + bairroRef.current + ", " + cidadeRef.current + ", " + estadoRef.current + ", " + cepRef.current],
                        ["Data de voo",diavooRef.current.toDateString()],
                        ["Drone",droneRef.current],
                        ["Câmera",camRef.current],
                        ["Filtro",filtroRef.current],
                        ["Aspect Ratio", aspectRef.current],
                        ["Qualidade", videoqRef.current],
                        ["FOV", fovRef.current],
                        ["EIS", eisRef.current],
                        ["Color Mode", colorRef.current],
                        ["ISO", isoRef.current],
                        ["Auto ISO Limit", isolRef.current],
                        ["Shutter Speed", shutterRef.current],
                        ["White Balance", wbRef.current]
                        ), (item, index)=>([
                        item[0],
                        item[1],
                    ])),
                    invDescLabel: "Nota",
                    invDesc: "Este documento foi emitido por Dronematic, uma plataforma de assistencia a serviços de drone ainda em desenvolvimento",
                },
                footer: {
                    text: "Ordem de Serviço emitida por Dronematic.",
                },
                pageEnable: true,
                pageLabel: "Página ",
            };

            jsPDFInvoiceTemplate(pdfObject)
      }

    return (
        <div className="space-y-2 space-x-2 text-right">
            <button 
                className="bg-black hover:bg-green-900 text-white rounded-full w-32"
                onClick={() => {genPDF(data.servico_id)}}
                >Gerar PDF
            </button>

            <button 
                className="bg-black hover:bg-green-900 text-white rounded-full w-36"
                onClick={() => {window.open("https://www.google.com/maps?q="+ruaRef.current+","+numeroRef.current+","+bairroRef.current+","+cidadeRef.current+","+estadoRef.current+","+cepRef.current )}}
                >Abrir no Mapa
            </button>

            <button 
                className="bg-black hover:bg-green-900 text-white rounded-full w-24"
                onClick={() => {window.open("https://www.google.com/maps/dir/"+lat+","+long+"/"+ruaRef.current+","+numeroRef.current+","+bairroRef.current+","+cidadeRef.current+","+estadoRef.current+","+cepRef.current )}}
                >Traçar Rota
            </button>

            <Link
                href={{
                    pathname: '/service/update',
                    query: "servico_id="+data.servico_id
                }}
                >
                <button 
                    className="bg-black hover:bg-green-900 text-white rounded-full w-24"
                    onClick={() => toast.loading("Carregando dados", {id:"upCliToast"})}
                    >Editar
                </button>
            </Link>

            <button 
            className="bg-black hover:bg-green-900 text-white rounded-full w-24"
            onClick={() => {toast((t) => (
                <div className="flex flex-col gap-3">
                  <p>Você tem certeza que deseja excluir esse serviço?</p>
                    <div className="text-center space-x-1">
                        <button 
                            className="bg-red-700 hover:bg-red-900 text-white rounded-full w-24" 
                            onClick={() => {handleDelete(data.servico_id),toast.dismiss(t.id="1"), toast.dismiss(t.id="2")}}>
                            Excluir
                        </button>
                        <button 
                            className="bg-black hover:bg-green-900 text-white rounded-full w-24"
                            onClick={() => {toast.dismiss(t.id="1"), toast.dismiss(t.id="2")}}>
                            Cancelar
                        </button>
                    </div>
                </div>
              ), {id:"1",duration: 12000, icon:'⚠'}),
              toast("As configurações para esse serviço também serão excluidas!", {id:"2", duration: 12000, icon:"⚠"})}}
                >Excluir
            </button>

        </div>
    )
  }