import { GET_ALL_CLASIFICACIONES , CREATED_CLASIFICACION , GET_ALL_GASTOS , CREATED_GASTO } from '../constants/index'
import axios from 'axios'
const { REACT_APP_API} = process.env


// CLASIFICACION
export function getAllClasificiones (id) {
    console.log('Estoy trayendo todas las clasificaciones');
    return function (dispatch){
        return axios.get(`${REACT_APP_API}/gastos/clasificacion/${id}`)
        .then(response => {
            console.log('trayendo las clasificaciones',response.data);
            dispatch({
                type: GET_ALL_CLASIFICACIONES,
                payload: response.data
            })
        })
        .catch(e => console.log(e))
    }

}

export function createClasificacion (data) {
    return function (dispatch){
        return axios.post(`${REACT_APP_API}/gastos/createClasificacion`, data)
            .then(response => {
                dispatch({
                    type: CREATED_CLASIFICACION,
                    payload: response
                })
            })
            .catch(e=>console.log(e))
    }
}

export function deleteClasificacion (id) {
    return function (dispatch) {
        return axios.delete(`${REACT_APP_API}/gastos/deleteClasificacion/${id}`)
            .then(response => {
                dispatch({
                    type: CREATED_CLASIFICACION,
                    payload: response
                })
            })
    }
}

// GASTOS ITEM

export function getAllGastos (clasificacionId) {
    return function (dispatch) {
        return axios.get(`${REACT_APP_API}/gastos/getGasto/${clasificacionId}`)
        .then(response => {
            console.log('todos los gastos perri', response);
            dispatch({
                type: GET_ALL_GASTOS,
                payload: response.data
            })
        })
    }
}

export function createGastos (data) {
    return function (dispatch) {
        return axios.post(`${REACT_APP_API}/gastos/createGasto`, data)
        .then(response => {
            console.log('gasto creadoooo', response);
            dispatch({
                type: CREATED_GASTO,
                payload: response
            })
        })
    }
}

export function deleteGastos (gastoId) {
    return function (dispatch) {
        return axios.delete(`${REACT_APP_API}/gastos/deleteGasto/${gastoId}`)
            .then(response => {
                dispatch({
                    type: CREATED_GASTO,
                    payload: response
                })
            })
    }
}
