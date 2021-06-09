import axios from 'axios';
import {
    GET_WEATHER
} from '../constants';
export const getWeather = (city) => {
    return function(dispatch) {
        axios
            .get(`http://api.openweathermap.org/data/2.5/weather?q=${city},&appid=4ae2636d8dfbdc3044bede63951a019b`)
            .then((r) => r.data)
            .then((data) => {
                dispatch({
                    type: GET_WEATHER,
                    payload: data
                });
            });
    }
}