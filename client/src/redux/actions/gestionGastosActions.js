import { GET_ALL_CLASIFICACIONES , CREATED_CLASIFICACION , GET_ALL_GASTOS , CREATED_GASTO , GET_TOTAL , GASTO_BY_INPUT , DELETE_CLASIFICACION} from '../constants/index'
import axios from 'axios'
import swal from 'sweetalert';
const { REACT_APP_API} = process.env


// CLASIFICACION
export function getAllClasificiones (id) {
    console.log('Estoy trayendo todas las clasificaciones', id);
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
        console.log('estoy creando una clasificacionnnnn', data);
        return axios.post(`${REACT_APP_API}/gastos/createClasificacion`, data)
            .then(response => {
                dispatch({
                    type: CREATED_CLASIFICACION,
                    payload: response.data
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
                    type: DELETE_CLASIFICACION,
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
            swal('Gasto creado correctamente',{icon:'success'})
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

//////////////  TOTAL ///////////////////


export function getTotal (empresaId) {
    return function (dispatch) {
        return axios.get(`${REACT_APP_API}/gastos/getTotal/${empresaId}`)
        .then(response => {
            console.log('todos los total perri', response);
            dispatch({
                type: GET_TOTAL,
                payload: response.data
            })
        })
    }
}

////////////   BUSCADOR INPUT /////////////////


export function getGastoByInput (input) {
    return function (dispatch) {
        return axios.get(`${REACT_APP_API}/gastos/getGastoByInput/${input}`)
        .then(response => {
            console.log('el intento del inputtttttttttttttttt', response);
            dispatch({
                type: GASTO_BY_INPUT,
                payload: response.data
            })
        })
    }
}

