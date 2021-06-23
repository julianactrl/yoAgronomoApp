import {GET_EMPRESA_ID, POST_EMPRESA, GET_EMPRESA, UPDATE_EMPRESA, DELETE_EMPRESA} from '../constants';
import axios from 'axios';
const { REACT_APP_API, REACT_APP_API_HEROKU} = process.env



export function getAllEmpresas(id) {
    return function(dispatch) {
        return fetch(`${REACT_APP_API_HEROKU}/empresa/user/${id}`)
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
        return fetch(`${REACT_APP_API_HEROKU}/empresa/${id}`)
        .then(response=>response.json())          
            .then(json=>{
                dispatch({          
                type: GET_EMPRESA_ID,
                payload: json
            })
        })
    }
}


export const postEmpresa = ({ name, hectareas,ubicacion,imagen,userId }) => {

    return (dispatch) => {
        dispatch({ type: POST_EMPRESA });
        axios({
            method: 'post',
            url: `${REACT_APP_API_HEROKU}/empresa/create`,
            data: {
                name,
                hectareas,
                ubicacion,
                imagen,
                userId
            },
        }).catch(e => dispatch(e))
    }
}
export const updateEmpresa = ({ id,name, hectareas,ubicacion,image }) => {

    return (dispatch) => {
        dispatch({ type: UPDATE_EMPRESA });
        axios({
            method: 'put',
            url: `${REACT_APP_API_HEROKU}/empresa/create/${id}`,
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
            url: `${REACT_APP_API_HEROKU}/empresa/delete/${id}`,
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
