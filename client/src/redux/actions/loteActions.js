import {GET_ALL_LOTES, CREATE_LOTE} from '../constants/index'
import axios from 'axios'
const { REACT_APP_API} = process.env

export function getAllLotes (empresaId) {
    return function(dispatch) {
        return fetch(`${REACT_APP_API}/lote/empresa/${empresaId}`)
            .then(data => data.json())
            .then(data => {
                dispatch({
                    type: GET_ALL_LOTES,
                    payload: data
                })
            })
    }
}

// export function crearLoteDB (data) {
//     return function(dispatch) {
//         return axios.post(`${REACT_APP_API}/lote/create`, data)
//         .then(response => {
//             dispatch({
//                 type: CREATE_LOTE,
//                 payload: response
//             })
//         })
//         .catch(e => console.log(e))
//     }

// }
export const crearLoteDB = (payload) => async (dispatch) => {
    console.log(payload)
    return axios
        .post(`${REACT_APP_API}/lote/create/`,
        payload.fd)
        .then((update)=>{
            dispatch({
                type: CREATE_LOTE,
                payload: update
            })
            // window.location.reload()
        })
        .catch((e)=>
        console.log("soy e error en create Lote", e.response?.data?.status)
        )
}



export function crearLoteManejo (data, id) {
    console.log('sdasdsadsadsadasdadasdasasd');

    return axios.post(`${REACT_APP_API}/lote/createManejo/${id}`, data)
    .then(response => response)
    .catch(e => console.log(e))

}

export function getManejo (id) {
    console.log('Action Get MAnejoooooooo');
    return function(dispatch) {
        return fetch(`${REACT_APP_API}/lote/manejos/${id}`)
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

    return axios.delete(` ${REACT_APP_API}/lote/deleteManejo/${id}`)
    .then(response => response)
    .catch(e => console.log(e))

}
export function updateLot (data, id) {

    return axios.put(` ${REACT_APP_API}/lote/${id}`, data)
    .then(response => response)
    .catch(e => console.log(e))

}
export function borrarLote (id) {

    return axios.delete(` ${REACT_APP_API}/lote/delete/${id}`)
    .then(response => response)
    .catch(e => console.log(e))

}
export function updateManejoLot (data, id) {

    return axios.put(`${REACT_APP_API}/lote/updateManejo/${id}`, data)
    .then(response => response)
    .catch(e => console.log(e))

}
