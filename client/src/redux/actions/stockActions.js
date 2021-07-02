import { GET_STOCK, CREATE_STOCK,  GET_STOCK_BY_ID, UPDATE_STOCK } from "../constants";
import axios from 'axios';
const { REACT_APP_API} = process.env;


export function getStock (){
    return async function (dispatch){
        return await axios.get(`${REACT_APP_API}/stock`)
        .then(res => {
            dispatch({
                type: GET_STOCK,
                payload: res.data
            })
        })
    }
}
export function getStockById (id){
    return async function (dispatch){
        return axios.get(`${REACT_APP_API}/stock/empresa/${id}`)
        .then(res => {
            dispatch({
                type: GET_STOCK_BY_ID,
                payload: res.data
            })
            console.log(res.data)
        })
    }
}
export function createStock (data){
    return async function (dispatch) {
        console.log(data)
        return await axios.post(`${REACT_APP_API}/stock/create`, data)
        .then(res => {
            dispatch({
                type: CREATE_STOCK,
                payload: res.data,
            })
        })
    }
}
export function deleteStock (id) {
    return async function (dispatch) {
        return await axios.delete(`${REACT_APP_API}/stock/delete/${id}`)
        .catch(e => dispatch(e))
    }
}
export function updateStock(data, id) {
    return async function (dispatch) {
        console.log('entroo')
        return await axios.put(`${REACT_APP_API}/stock/edit/${id}`, data)
        // .then(res => {
        //     dispatch({
        //         type:UPDATE_STOCK,
        //         payload:res.data
        //     })
        //     console.log('joyaaa', res.data)
        // })
    }
}
