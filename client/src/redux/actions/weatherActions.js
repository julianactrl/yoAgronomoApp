import axios from 'axios';
import {
    GET_WEATHER,CLEAR_WEATHER
} from '../constants';

const { REACT_APP_WEATHER_API_KEY } = process.env

export const getWeather = (city) => {
    console.log("esta es la ubicacion que lleha a la accion",city)
    return function(dispatch) {
        axios
            .get(`https://api.weatherapi.com/v1/forecast.json?key=${REACT_APP_WEATHER_API_KEY}&q=${city}&days=3&aqi=no&alerts=no`)
            .then((r) => r.data)
            .then((data)=> {
                dispatch({
                    type: GET_WEATHER,
                    payload: data
                });
            });
    }
}
export const clearWeather = () => {
    return{
        type: CLEAR_WEATHER
    }
}