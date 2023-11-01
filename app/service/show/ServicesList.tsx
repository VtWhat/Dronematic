'use client'
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/supabase'
import { Card, CardBody, CardHeader, Image, Button, Divider } from '@nextui-org/react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { useRouter } from "next/navigation"
import { useEffect, useState } from 'react'
import jsPDFInvoiceTemplate from "./jsPDFInvoiceTemplate.js"

export default function ServicesList({ servicos, userprofile, session} : { servicos: any[] | null, userprofile: any | null, session: Session | null}) {
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

  const handleDelete = async (servico_id: any) => {
    const res = await supabase.from("servicos").delete().eq("servico_id", servico_id)
    toast.success("Serviço excluido!")
    router.refresh()
  }

  const generatePDF = async ({ servico }: { servico: any | null}) => {
    const pdfObject = {
        outputType: "dataurlnewwindow",
        returnJsPDFDocObject: false,
        fileName: servico.clientes.nome + "-" + servico.clientes.sobrenome + "(" + new Date().toISOString().replace(/T.*/,'').split('-').reverse().join('/') + ")",
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
            name: userprofile.nome,
            address: userprofile.endereco,
            phone: userprofile.telefone,
            email: session?.user.email,
            website: userprofile.website,
        },
        contact: {
            label: "Ordem de serviço emitida para:",
            name: servico.clientes.nome + " " + servico.clientes.sobrenome,
            address: servico.clientes.rua + ", " + servico.clientes.numero + ", " + servico.clientes.bairro + ", " + servico.clientes.cidade + ", " + servico.clientes.estado + ", " + servico.clientes.cep,
            phone: servico.clientes.telefone_1,
            email: servico.clientes.email,
            otherInfo: "",
        },
        invoice: {
            label: "Serviço#",
            num: servico.servico_id,
            invDate: 'Agendado: ' + new Date(servico.date).toISOString().replace(/T.*/,'').split('-').reverse().join('/'),
            invGenDate: "Emitido: " + new Date().toISOString().replace(/T.*/,'').split('-').reverse().join('/'),
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
                ["Categoria",servico.categoria],
                ["Descrição",servico.description],
                ["Rota",servico.route],
                ["Local de voo",servico.rua + ", " + servico.numero + ", " + servico.bairro + ", " + servico.cidade + ", " + servico.estado + ", " + servico.cep],
                ["Data de voo", new Date(servico.date).toISOString().replace(/T.*/,'').split('-').reverse().join('/')],
                ["Drone",servico.config.drone],
                ["Câmera",servico.config.camera],
                ["Filtro",servico.config.filter],
                ["Aspect Ratio", servico.config.aspect_ratio],
                ["Qualidade", servico.config.video_quality],
                ["FOV", servico.config.fov],
                ["EIS", servico.config.eis],
                ["Color Mode", servico.config.color_mode],
                ["ISO", servico.config.iso],
                ["Auto ISO Limit", servico.config.auto_iso_limit],
                ["Shutter Speed", servico.config.shutter],
                ["White Balance", servico.config.wb]
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
    <div className='w-full flex justify-center items-center'>
      {servicos?.length != 0 ?
        <div className="grid grid-cols-3 gap-4 py-10">
          {servicos?.map((servico) => 
            <Card className="p-4 w-96" isPressable >
                <CardHeader className="flex flex-col items-start truncate">
                  <h4 className="font-bold text-large text-black">{servico.clientes.nome + " " + servico.clientes.sobrenome + " - #" + servico.servico_id}</h4>
                  <p className='text-black text-small'>
                      {servico.categoria}
                  </p>
                  <p className='text-black text-small'>
                      {servico.date.replace(/T.*/,'').split('-').reverse().join('/')}
                  </p>
                  <Divider className='my-2'/>
                  <p className='text-black text-small'>
                      {servico.rua}
                  </p>
                  <p className='text-black text-small'>
                      {servico.bairro}, {servico.numero}
                  </p>
                  <p className='text-black text-small'>
                      {servico.cep}
                  </p>
                  <p className='text-black text-small'>
                      {servico.cidade}-{servico.estado}
                  </p>
                  <Divider className='my-2'/>
                  <p className='text-black text-small'>
                      {servico.config.drone}
                  </p>
                  <p className='text-black text-small'>
                      {servico.config.camera}
                  </p>
                </CardHeader>
                 <Divider className='mb-4'/>
                 <div className='w-full h-full flex flex-wrap justify-center gap-y-2 '>
                    <Button variant='shadow' color='secondary' className='mx-2'
                    onClick={() => {window.open("https://www.google.com/maps?q="+servico.rua+","+servico.numero+","+ servico.bairro +","+ servico.cidade +","+ servico.estado+ "," + servico.cep )}}
                        >Abrir no Mapa
                    </Button>
                    <Button variant='shadow' color='secondary' className='mx-2'
                    onClick={() => {window.open("https://www.google.com/maps/dir/"+lat+","+long+"/"+servico.rua+","+servico.numero+","+ servico.bairro +","+ servico.cidade +","+ servico.estado+ "," + servico.cep )}}
                        >Traçar Rota
                    </Button>                    
                    <Link href={{pathname: '/service/update', query: servicos ? "servico_id=" + (servico.servico_id).toString() : ""}}>
                      <Button variant='shadow' color='primary' className='mx-2'
                      onClick={() => toast.loading("Carregando dados", {id:"upCliToast"})}
                          >Editar
                      </Button>                   
                    </Link>
                    <Button variant='shadow' color='default' className='mx-2'
                    onClick={() => {generatePDF({ servico })}}
                        >Gerar PDF
                    </Button>   
                    <Button variant='shadow' color='danger' className='mx-2'
                    onClick={() => {toast((t) => (
                        <div className="flex flex-col gap-3">
                          <p>Você tem certeza que deseja excluir esse serviço?</p>
                            <div className="text-center space-x-1">
                                <Button variant='shadow' color='danger' className='mx-2'
                                    onClick={() => {handleDelete(servico.servico_id),toast.dismiss(t.id="1"), toast.dismiss(t.id="2")}}>
                                    Excluir
                                </Button>
                                <Button variant='shadow' color='primary' className='mx-2'
                                    onClick={() => {toast.dismiss(t.id="1"), toast.dismiss(t.id="2")}}>
                                    Cancelar
                                </Button>
                            </div>
                        </div>
                      ), {id:"1",duration: 12000, icon:'⚠'})}}
                        >Excluir
                    </Button>
                  </div>
            </Card>
          )}
        </div>
       : 
        <div className='py-10 flex items-center justify-center'> 
            <Card className='p-4 w-full'>
                <CardHeader className='text-black w-full'>
                        Você não possui nenhum serviço cadastrado!
                </CardHeader>
                <div className='w-full flex justify-center items-center'>
                    <Button color="primary" variant="shadow" radius="full" size="lg" className='w-1/2'
                    onClick={() => router.push('/service/create')}
                    >Cadastro de Serviços
                    </Button>
                </div>
            </Card> 
        </div>
        }
    </div>
  )
}