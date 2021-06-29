import axios from 'axios';
import {GET_NEWS} from '../constants/index';

const apiKey=process.env.REACT_APP_NEWS_API_KEY

export const getNews = () => {
    return function (dispatch) {
        axios.get(`https://api.jornalia.net/api/v1/articles?apiKey=${apiKey}&search=campo+agroindustria+agronomia&providers=Clarin%2CPagina12%2CLaNacion%2CCronista%2CInfobae&categories=POLITICA%2CECONOMIA&startDate=2021-06-02&endDate=2021-06-09`)
        .then((res) => {
            console.log('funciono!')
            dispatch({
                type: GET_NEWS,
                payload: res.data
            })
        })
    }
}