import React,{useEffect,useState} from 'react'
import {useDispatch,useSelector,connect} from 'react-redux'
import {getWeather} from '../../redux/actions/weatherActions'
import '../Weather/Weather.css'
import axios from 'axios'


const Weather = (props) => {
 
    const [loading,setLoading] = useState(true)
    const [time, setTime] = useState("")
    const dispatch = useDispatch()
    const weather = useSelector(state => state.weatherReducer.weather)
    useEffect(() => {
        dispatch(getWeather("tokyo"))
        if(weather !== null){
            setLoading(false)
        }
        
    },[]) 
    function interval(){
    const date = new Date()
    return date.toLocaleTimeString()
    }
    useEffect(() =>{
       let intervalo = setInterval(() => {
            setTime(interval)
        },1000)
    },[])
    
    
    
    return (
        <div className="container-weather">
           {
            loading===true ? <h1>Cargando</h1> :
                <div>
                    {
                        weather && weather.map(w => (
                            <div>
                                <div className="current-weather">
                                    <h1>{w.location.name}</h1>
                                    <p>{interval()}</p>
                                    <h1>{w.current.temp_c}C°</h1>
                                    <img src={w.current.condition.icon} alt="" />
                                </div>
                                <div className="forecast">
                                    {
                                        w.forecast.forecastday.map(p => (
                                            <div className="forecast-day">
                                                <p>{p.date}</p>
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
    )
}


export default Weather
