'use client'

import { useEffect } from 'react';
import useState from 'react-usestateref';
 
export default function HomeForecast() {

    const [lat, setLat, latRef] = useState<number>();
    const [long, setLong, longRef] = useState<number>();
    const [forecastData, setForecast, forecastRef] = useState<any>();

    const getForecastData = async () => {
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latRef.current}&longitude=${longRef.current}&daily=weathercode,temperature_2m_max,temperature_2m_min,windspeed_10m_max&timezone=America%2FSao_Paulo`);
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
        <label>Data: {forecastData?.daily.time[0]}</label>
        <label>Código Meteorológico: {forecastData?.daily.weathercode[0]}</label>
        <label>Temperatura Máxima: {forecastData?.daily.temperature_2m_max[0]+forecastData?.daily_units.temperature_2m_max}</label>
        <label>Temperatura Mínima: {forecastData?.daily.temperature_2m_min[0]+forecastData?.daily_units.temperature_2m_min}</label>
        <label>Velocidade do vento Máxima: {forecastData?.daily.windspeed_10m_max[0]+forecastData?.daily_units.windspeed_10m_max}</label> 
    </div>
  )
}