import React,{useEffect,useState} from 'react'
import {useDispatch,useSelector,connect} from 'react-redux'
import {getWeather} from '../../redux/actions/weatherActions'
import axios from 'axios'


const Weather = (props) => {
    const [weatherApp,setWeatherApp] = useState([])
    const [name, setName] = useState("")
 
    console.log(props)
    useEffect(() => {
       props.getWeather("tucuman")
       setWeatherApp(props.weather)
        
        
    },[])
    console.log("EEE3333",weatherApp)
    
    return (
        <div>
            <p>Name:</p>
        </div>
    )
}
const mapStateToProps = (state) => {
    return{
        weather: state.weatherReducer.weather
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        getWeather: (city) => dispatch(getWeather(city))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Weather)
