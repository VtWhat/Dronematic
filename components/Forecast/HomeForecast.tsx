'use client'

import { useEffect } from 'react';
import useState from 'react-usestateref';
 
export default function HomeForecast() {

    const [lat, setLat, latRef] = useState<number>();
    const [long, setLong, longRef] = useState<number>();
    const [forecastData, setForecast, forecastRef] = useState<any>();

    const getForecastData = async () => {
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latRef.current}&longitude=${longRef.current}&current=temperature_2m,windspeed_10m&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max,windspeed_10m_max&timezone=America%2FSao_Paulo`);
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

    console.log(forecastRef.current)

  return (
    <div className='flex flex-col items-center gap-2 py-2 px-3 flex rounded-md no-underline bg-black hover:bg-green-900 text-white'>
        <label>Condições Meteorológicas:</label> 
        <label>Data: {forecastData?.current.time}</label>
        <label>Código Meteorológico: {forecastData?.daily.weathercode[0]}</label>
        <label>Temperatura Atual: {forecastData?.current.temperature_2m+forecastData?.current_units.temperature_2m}</label>
        <label>Temperatura Máxima: {forecastData?.daily.temperature_2m_max[0]+forecastData?.daily_units.temperature_2m_max}</label>
        <label>Temperatura Mínima: {forecastData?.daily.temperature_2m_min[0]+forecastData?.daily_units.temperature_2m_min}</label>
        <label>Velocidade do vento Atual: {forecastData?.current.windspeed_10m+forecastData?.current_units.windspeed_10m}</label> 
        <label>Velocidade do vento Máxima: {forecastData?.daily.windspeed_10m_max[0]+forecastData?.daily_units.windspeed_10m_max}</label> 
        <label>Probabilidade de Precipitação: {forecastData?.daily.precipitation_probability_max[0]+forecastData?.daily_units.precipitation_probability_max}</label> 
    </div>
  )
}