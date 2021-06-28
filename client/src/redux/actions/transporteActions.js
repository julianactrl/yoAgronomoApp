import {GET_TRANSPORTE, DELETE_TRANSPORTE, PUT_TRANSPORTE, POST_TRANSPORTE, GET_TRANSPORTE_ID } from '../constants';
import axios from 'axios';
const { REACT_APP_API} = process.env



export function getTransporte(id) {
    return function(dispatch) {
        return fetch(`${REACT_APP_API}/transporte/get/${id}`)
        .then(response=>response.json())          
            .then(json=>{
                dispatch({          
                type: GET_TRANSPORTE,
                payload: json
            })  
        })
    }
};

export function getTransporteById(id) {
    return function(dispatch) {
        return fetch(`${REACT_APP_API}/transporte/getone/${id}`)
        .then(response=>response.json())
            .then(json=>{
                dispatch({
                    type: GET_TRANSPORTE_ID,
                    payload: json
                })
            })
    }
}
export const postTransporte = ({ patente, conductor, carga, fechaEntrada, fechaSalida, observaciones,empresaId }) => {

    return (dispatch) => {
        dispatch({ type: POST_TRANSPORTE });
        axios({
            method: 'post',
            url: `${REACT_APP_API}/transporte/create`,
            data: {
                patente,
                conductor,
                carga,
                fechaEntrada,
                fechaSalida,
                observaciones,
                empresaId
            },
        }).catch(e => dispatch(e))
    }
};
export const updateTransporte = ({ patente, conductor, carga, fechaEntrada, fechaSalida, observaciones, id }) => {

    return (dispatch) => {
        dispatch({ type: PUT_TRANSPORTE });
        axios({
            method: 'put',
            url: `${REACT_APP_API}/transporte/update/${id}`,
            data: {
                patente,
                conductor,
                carga,
                fechaEntrada,
                fechaSalida,
                observaciones
            },
        }).catch(e => dispatch(e))
    }
};
export const deleteTransporte = (id) => {

    return (dispatch) => {
        dispatch({ type: DELETE_TRANSPORTE });
        axios({
            method: 'delete',
            url: `${REACT_APP_API}/transporte/delete/${id}`,
            payload: id
        }).catch(e => dispatch(e))
    }
};

// export const getById = (id) => {
//     return 
// }