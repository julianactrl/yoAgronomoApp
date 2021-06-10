import React,{useEffect,useState} from 'react'
import {useDispatch,useSelector,connect} from 'react-redux'
import {getWeather} from '../../redux/actions/weatherActions'
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
        <div>
           {
            loading===true ? <h1>Cargando</h1> :
            weather && weather.map(c => (
                   <div>
                       <p>{c.name}</p>
                       <p>{c.main.temp}</p>
                        <p>{c.main.temp_max-273}</p>
                        <img src={c.weather[0].icon} alt="" />
                     
                   </div>
               ))
               
           }
        </div>
    )
}


export default Weather
