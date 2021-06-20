import {GET_ALL_LOTES, CREATE_LOTE} from '../constants/index'
import axios from 'axios'
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
        console.log('etoy haciendo el post gfe');
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