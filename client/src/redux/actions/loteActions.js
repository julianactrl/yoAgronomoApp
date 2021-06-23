import {GET_ALL_LOTES, CREATE_LOTE} from '../constants/index'
import axios from 'axios'
const { REACT_APP_API, REACT_APP_API_HEROKU} = process.env

export function getAllLotes (empresaId) {
    return function(dispatch) {
        return fetch(`http://localhost:3001/lote/empresa/${empresaId}`)
            .then(data => data.json())
            .then(data => {
                dispatch({
                    type: GET_ALL_LOTES,
                    payload: data
                })
            })
    }
}

export function crearLoteDB (data) {
    return function(dispatch) {
        return axios.post(`http://localhost:3001/lote/create`, data)
        .then(response => {
            dispatch({
                type: CREATE_LOTE,
                payload: response
            })
        })
        .catch(e => console.log(e))
    }

}
export function crearLoteManejo (data, id) {
    console.log('sdasdsadsadsadasdadasdasasd');

    return axios.post(`http://localhost:3001/lote/createManejo/${id}`, data)
    .then(response => response)
    .catch(e => console.log(e))

}
export function getManejo (id) {
    return function(dispatch) {
        return fetch(`http://localhost:3001/lote/manejos/${id}`)
            .then(data => data.json())
            .then(data => {
                dispatch({
                    type: 'GET_MANEJO',
                    payload: data
                })
            })
    }
}

export function deleteManejo (id) {

    return axios.delete(`http://localhost:3001/lote/deleteManejo/${id}`)
    .then(response => response)
    .catch(e => console.log(e))

}
export function updateLot (data, id) {

    return axios.put(`http://localhost:3001/lote/${id}`, data)
    .then(response => response)
    .catch(e => console.log(e))

}
export function borrarLote (id) {

    return axios.delete(`http://localhost:3001/lote/delete/${id}`)
    .then(response => response)
    .catch(e => console.log(e))

}
export function updateManejoLot (data, id) {

    return axios.put(`http://localhost:3001/lote/updateManejo/${id}`, data)
    .then(response => response)
    .catch(e => console.log(e))

}
