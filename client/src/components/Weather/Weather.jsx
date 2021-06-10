import React,{useEffect,useState} from 'react'
import {useDispatch,useSelector,connect} from 'react-redux'
import {getWeather} from '../../redux/actions/weatherActions'
import '../Weather/Weather.css'
import axios from 'axios'


const Weather = (props) => {
 
   const [loading,setLoading] = useState(true)
    const dispatch = useDispatch()
    const weather = useSelector(state => state.weatherReducer.weather)
    useEffect(() => {
        dispatch(getWeather("tucuman"))
        if(weather !== null){
            setLoading(false)
        }
        
    },[]) 
    
    
    return (
        <div className="container-weather">
           {
            loading===true ? <h1>Cargando</h1> :
                <div>
                    {
                        weather && weather.map(w => (
                            <div>
                                <h1>Ciudad:{w.location.name}</h1>
                                <h1>{w.current.temp_c}C°</h1>
                                <div>
                                    {
                                        w.forecast.forecastday.map(p => (
                                            <div>
                                                <p>{p.date}</p>
                                                <p>Max:{p.day.maxtemp_c}c°</p>
                                                <p>Min:{p.day.mintemp_c}c°</p>
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
