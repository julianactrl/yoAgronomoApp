import {GET_ALL_LOTES, CREATE_LOTE} from '../constants/index'
import axios from 'axios'
const { REACT_APP_API, REACT_APP_API_HEROKU} = process.env

export function getAllLotes (empresaId) {
    return function(dispatch) {
        return fetch(`${REACT_APP_API_HEROKU}/lote/empresa/${empresaId}`)
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
        return axios.post(`${REACT_APP_API_HEROKU}/lote/create`, data)
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

    return axios.post(`http://localhost:3001/lote/createManejo/${id}`, data)
    .then(response => response)
    .catch(e => console.log(e))

}
export function getManejo (id) {
    return function(dispatch) {
        return fetch(`${REACT_APP_API_HEROKU}/lote/manejos/${id}`)
            .then(data => data.json())
            .then(data => {
                dispatch({
                    type: 'GET_MANEJO',
                    payload: data
                })
            })
    }
}

export function borrarManejo (id) {

    return axios.delete(`http://localhost:3001/lote/deleteManejo/${id}`)
    .then(response => response)
    .catch(e => console.log(e))

}
export function borrarLote (id) {

    return axios.delete(`${REACT_APP_API_HEROKU}/lote/delete/${id}`)
    .then(response => response)
    .catch(e => console.log(e))

}