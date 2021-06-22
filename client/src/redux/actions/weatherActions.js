import axios from 'axios';
import {
    GET_WEATHER
} from '../constants';

const { REACT_APP_WEATHER_API_KEY } = process.env

export const getWeather = (city) => {
    return function(dispatch) {
        axios

            .get(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}=${city}&days=7&aqi=no&alerts=no`)

            .then((r) => r.data)
            .then((data) => {
                dispatch({
                    type: GET_WEATHER,
                    payload: data
                });
            });
    }
}