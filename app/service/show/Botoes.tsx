// @ts-nocheck
"use client"

import { Database } from "@/supabase"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import jsPDFInvoiceTemplate from "app/service/show/jsPDFInvoiceTemplate.js"

export default function Botoes(data: { servico_id: any, u_email: string}) {
    const supabase = createClientComponentClient<Database>()
    const router = useRouter()

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
    const [nome, setNome] = useState<string>("")
    const [sobrenome, setSobrenome] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [telefone, setTelefone] = useState<string>("")
    const [cidadecli, setCidadecli] = useState<string>("")
    const [estadocli, setEstadocli] = useState<string>("")
    const [bairrocli, setBairrocli] = useState<string>("")
    const [ruacli, setRuacli] = useState<string>("")
    const [numerocli, setNumerocli] = useState<string>("")
    const [cepcli, setCepcli] = useState<string>("")

    // serviço
    const [description, setDescription] = useState<string>("")
    const [route, setRoute] = useState<string>("")
    const [cat, setCat] = useState<string>("")

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

    //user
    const [user_name, setUser_name] = useState<string>("")
    const [user_address, setUser_address] = useState<string>("")
    const [user_cell, setUser_cell] = useState<string>("")
    const [user_website, setUser_website] = useState<string | null>("")
    const [user_email, setUser_email] = useState<string>(data.u_email)

    const genPDF = async (id: any) => {
        const { data } = await supabase.from("servicos").select("*,clientes(*),config(*)").eq("servico_id", id).single()
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

            setTimeout(() => {
                const pdfObject = {
                    outputType: "dataurlnewwindow",
                    returnJsPDFDocObject: false,
                    fileName: nome + "-" + sobrenome + "(" + new Date().toDateString() + ")",
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
                        name: user_name,
                        address: user_address,
                        phone: user_cell,
                        email: user_email,
                        website: user_website,
                    },
                    contact: {
                        label: "Ordem de serviço emitida para:",
                        name: nome + " " + sobrenome,
                        address: ruacli + ", " + numerocli + ", " + bairrocli + ", " + cidadecli + ", " + estadocli + ", " + cepcli,
                        phone: telefone,
                        email: email,
                        otherInfo: "",
                    },
                    invoice: {
                        label: "Serviço#",
                        num:data.servico_id,
                        invDate: 'Agendado: ' + diavoo.toDateString(),
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
                            ["Categoria",cat],
                            ["Descrição",description],
                            ["Rota",route],
                            ["Local de voo",rua + ", " + numero + ", " + bairro + ", " + cidade + ", " + estado + ", " + cep],
                            ["Data de voo",diavoo.toDateString()],
                            ["Drone",drone],
                            ["Câmera",cam],
                            ["Filtro",filtro],
                            ["Aspect Ratio", aspect],
                            ["Qualidade", videoq],
                            ["FOV", fov],
                            ["EIS", eis],
                            ["Color Mode", color],
                            ["ISO", iso],
                            ["Auto ISO Limit", isol],
                            ["Shutter Speed", shutter],
                            ["White Balance", wb]
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
            }, 0);
        }
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
                onClick={() => {window.open("https://www.google.com/maps?q="+rua+","+numero+","+bairro+","+cidade+","+estado+","+cep )}}
                >Abrir no Mapa
            </button>

            <button 
                className="bg-black hover:bg-green-900 text-white rounded-full w-24"
                onClick={() => {window.open("https://www.google.com/maps/dir/"+lat+","+long+"/"+rua+","+numero+","+bairro+","+cidade+","+estado+","+cep )}}
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