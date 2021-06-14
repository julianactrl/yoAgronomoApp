import React,{useEffect,useState} from 'react'
import {useDispatch,useSelector,connect} from 'react-redux'
import {getWeather} from '../../redux/actions/weatherActions'
import '../Weather/Weather.css'
import axios from 'axios'
import Header from '../Header/Header';


const Weather = (props) => {
    const [loading,setLoading] = useState(true)
    const [time, setTime] = useState("")
    const dispatch = useDispatch()
    const weather = useSelector(state => state.weatherReducer.weather)
    const ubication = useSelector(state => state.empresaReducer.empresaForId.ubicacion)
    useEffect(() => {
        dispatch(getWeather(ubication))
        if(weather !== null){
            setLoading(false)
        }
        
    },[]) 
    //Funcion que actualiza el reloj segundo a segundo
    function interval(){
    const date = new Date()
    return date.toLocaleTimeString()
    }
    useEffect(() =>{
       let intervalo = setInterval(() => {
            setTime(interval)
        },1000)
    },[])
    //Funcion que trae el dia segun la fecha
    const getDayWeek = (date) => {
        const fechaComoCadena = date; 
        const dias = [
        'Lunes',
        'Martes',
        'Miércoles',
        'Jueves',
        'Viernes',
        'Sábado',
        "Domingo"
        ];
    const numeroDia = new Date(fechaComoCadena).getDay();
    const nombreDia = dias[numeroDia];
    return nombreDia
    }
    
    return (
        <div className="body-weather">
            <Header />
        <div className="container-weather">
           {
            loading ? <h1>Cargando</h1> :
                <div>
                    {
                        weather && weather.map(w => (
                            <div>
                                <div className="current-weather">
                                    <h1>{w.location.name}</h1>
                                    <img className="live" src="https://static.wixstatic.com/media/e9a517_aab454c7f49544358e05ab4b293a15db~mv2.gif" alt="" />
                                    <h4>{interval()}</h4>
                                    <h1>{w.current.temp_c}C°</h1>
                                    <div className="wind_humidity">
                                        <p>Vel. del Viento: {w.current.wind_kph}km/h</p>
                                        <p>Humedad: {w.current.humidity}%</p>
                                    </div>
                                    <div className="wind_dir">
                                        <p>Direccion del viento: {w.current.wind_dir}°</p>
                                        <p>Indice UV: {w.current.uv}uv</p>
                                    </div>
                                    <img src={w.current.condition.icon} alt="" />
                                </div>
                                <p className="forecast-extended">
                                    Prónostico Extendido
                                </p>
                                <div className="forecast">
                                    {
                                        w.forecast.forecastday.map(p => (
                                            <div className="forecast-day">
                                                <p className="day-week">{getDayWeek(p.date)}</p>
                                                <div className="temperatures">
                                                    <p>Max:{p.day.maxtemp_c}c°</p>
                                                    <p>Min:{p.day.mintemp_c}c°</p>
                                                </div>
                                                <img src={p.day.condition.icon} alt="" />
                                            </div>
                                            
                                        ))
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
               
           }
        </div>
        </div>
    )
}


export default Weather
