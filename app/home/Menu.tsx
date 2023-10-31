'use client'

import { useRouter } from "next/navigation";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import {Image} from "@nextui-org/image";
import { useEffect, useState } from "react";
import wmo from "./wmo.json"

export default function Menu() {
    const router = useRouter()

    //Forecast
    const [forecastData, setForecast] = useState<any>();

    const getForecastData = async (lat: number, long: number) => {
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,is_day,weathercode&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=America%2FSao_Paulo&forecast_days=1`);
        const Forecast = await res.json()
        setForecast(Forecast)
    }

    useEffect(() => {
        if('geolocation' in navigator) {
            // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
            navigator.geolocation.getCurrentPosition(({ coords }) => {
                const { latitude, longitude } = coords;
                getForecastData(latitude, longitude)
            })
        }
    }, []);    

    const isDay = forecastData?.current.is_day == 1 ? "day" : "night"

    const weathercode = forecastData?.current.weathercode ? forecastData.current.weathercode : "2"
    
    //@ts-expect-error
    const forecastAltText = wmo[weathercode][isDay]["description"]
    //@ts-expect-error
    const forecastSrc = wmo[weathercode][isDay]["image"]

    console.log(forecastData)

    return (
        <div className='w-full flex justify-center items-center'>
            <div className="grid grid-cols-3 grid-rows-2 gap-4 p-10 w-1/2">
            <Card 
            className="py-4 col-span-2 flex flex-row overflow-visible justify-center items-center" 
            isPressable 
            onClick={(e) => router.push('/service/show')} >
                <CardHeader className="pl-6 flex-col w-1/2 items-start">
                <h4 className="font-bold text-large text-black">Agenda de Voos</h4>
                <p className='text-black text-justify text-small'>Visualize aqui sua agenda de voos e todas as informações pertinentes a eles,
                como local de voo, rotas para o local, horários entre outras informações</p>
                </CardHeader>
                <CardBody className="overflow-visible">
                <Image
                    alt="Card background"
                    className="object-cover overflow-visible h-52 w-96"
                    src="/HomeDrone.png"
                />
                </CardBody>
            </Card>

            <Card className={
            forecastData?.current.is_day == 1 ? "p-4 bg-gradient-to-br from-transparent to-sky-400" : "p-4 bg-gradient-to-br from-indigo-200 to-slate-700"
            }
            isPressable 
            onClick={(e) => router.push('#')} >
            <div className="flex flex-row text-black w-full">
                <p className="items-start w-1/2 text-left font-bold">Gravataí</p>
                <p className="items-end w-1/2 text-right">
                    {Number(new Date().getHours()) < 10 ? `0${new Date().getHours()}:` : `${new Date().getHours()}:`}
                    {Number(new Date().getMinutes()) < 10 ? `0${new Date().getMinutes()}` : `${new Date().getMinutes()}`}
                </p>
            </div>
            <CardBody className="overflow-visible items-center">
                <p className="absolute bottom-8 text-black text-xl font-bold">{`${Math.round(forecastData?.current.temperature_2m)}°`}</p>
                <Image
                    alt={forecastAltText}
                    className=""
                    src={forecastSrc}
                    width={180}
                />
            </CardBody>
            <div className="flex flex-row text-black w-full">
                <p className="items-start w-1/2 text-left">{`${forecastData?.daily.precipitation_probability_max}%`}</p>
                <p className="items-end w-1/2 text-right">{`${Math.round(forecastData?.daily.temperature_2m_min)}° - ${Math.round(forecastData?.daily.temperature_2m_max)}°`}</p>
            </div>
            </Card>

            <Card className="py-4" isPressable 
            onClick={(e) => router.push('/customer/create')} >
            <CardBody className="overflow-visible py-2">
                <Image
                    alt="Card background"
                    className="object-cover rounded-xl h-36"
                    src="/HomeBridge.webp"
                    width={270}
                />
                </CardBody>
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <h4 className="font-bold text-large text-black">Cadastrar Cliente</h4>
                <p className='text-black text-justify text-small'>
                    Aqui você pode cadastrar seus clientes com seus respectivos dados essenciais
                </p>
                </CardHeader>
            </Card>

            <Card className="py-4" isPressable 
            onClick={(e) => router.push('/service/create')} >
            <CardBody className="overflow-visible py-2">
                <Image
                    alt="Card background"
                    className="object-cover rounded-xl h-36"
                    src="/HomeAgro.jpg"
                    width={270}
                />
                </CardBody>
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <h4 className="font-bold text-large text-black">Cadastrar Serviço</h4>
                <p className='text-black text-justify text-small'>
                    Cadastre seus serviços e todos os seus dados técnicos necessários para o plano de voo aqui
                </p>
                </CardHeader>
            </Card>

            <Card className="py-4" isPressable 
            onClick={(e) => router.push('/manage')} >
            <CardBody className="overflow-visible py-2">
                <Image
                    alt="Card background"
                    className="object-cover rounded-xl h-36"
                    src="/HomeWorkers.jpg"
                    width={270}
                />
                </CardBody>
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <h4 className="font-bold text-large text-black">Gerenciar Dados</h4>
                <p className='text-black text-justify text-small'>
                    Visualize, atualize ou remova clientes e trabalhos cadastrados
                </p>
                </CardHeader>
            </Card>
            </div>
        </div>
    )
  }
  