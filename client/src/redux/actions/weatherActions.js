import axios from 'axios';
import {
    GET_WEATHER
} from '../constants';
export const getWeather = (city) => {
    return function(dispatch) {
        axios
            .get(`http://api.weatherapi.com/v1/forecast.json?key=b8da19009ae34d92b1112005211006&q=${city}&days=7&aqi=no&alerts=no`)
            .then((r) => r.data)
            .then((data) => {
                dispatch({
                    type: GET_WEATHER,
                    payload: data
                });
            });
    }
}