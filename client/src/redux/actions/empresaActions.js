import {GET_EMPRESA_ID, POST_EMPRESA, GET_EMPRESA, UPDATE_EMPRESA, DELETE_EMPRESA} from '../constants';
import axios from 'axios';
import { useDeprecatedAnimatedState } from 'framer-motion';
const { REACT_APP_API} = process.env



export function getAllEmpresas(id) {
    return function(dispatch) {
        return fetch(`${REACT_APP_API}/empresa/user/${id}`)
        .then(response=>response.json())          
            .then(json=>{
                dispatch({          
                type: GET_EMPRESA,
                payload: json
            })  
        })
    }
}

export function getEmpresa(id) {
    return function(dispatch) {
        return fetch(`${REACT_APP_API}/empresa/${id}`)
        .then(response=>response.json())          
            .then(json=>{
                dispatch({          
                type: GET_EMPRESA_ID,
                payload: json
            })
        })
    }
}


export const postEmpresa = (payload) => async (dispatch) => {
    console.log(payload)
    return axios
        .post(`${REACT_APP_API}/empresa/create/`,
        payload.fd)
        .then((update)=>{
            dispatch({
                type: POST_EMPRESA,
                payload: update
            })
            window.location.reload()
        })
        .catch((e)=>
        console.log("soy e error en create empresa", e.response?.data?.status)
        )
}
export const updateEmpresa = ({ id,name, hectareas,ubicacion,image }) => {

    return (dispatch) => {
        dispatch({ type: UPDATE_EMPRESA });
        axios({
            method: 'put',
            url: `${REACT_APP_API}/empresa/create/${id}`,
            data: {
                name,
                hectareas,
                ubicacion,
                image
            },
        }).catch(e => dispatch(e))
    }
}
export const deleteEmpresa = (id) => {

    return (dispatch) => {
        dispatch({ type: DELETE_EMPRESA });
        axios({
            method: 'delete',
            url: `${REACT_APP_API}/empresa/delete/${id}`,
            payload: id
        }).catch(e => dispatch(e))
    }
}
// export function deleteEmpresa(id){
//     return {
//         type: 'DELETE_EMPRESA',
//         payload: id
//     }
// }
