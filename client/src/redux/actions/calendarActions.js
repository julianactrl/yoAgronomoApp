import {POST_TAREA, GET_TAREAS, DELETE_TAREA, UPDATE_TAREA} from '../constants';
import axios from 'axios';
const { REACT_APP_API} = process.env



export function createTarea() {
    return function(dispatch) {
        dispatch({          
            type: POST_TAREA,
           
        })
        axios({
            method: 'post',
            url: `${REACT_APP_API}/tareas/create`
        })
            
        .then(response=> console.log(response.data))          
        .catch(error => console.log(error))
            
        }
    }
// export function createTarea () {
//     return function(dispatch) {
//         return axios.post(`${REACT_APP_API}/tarea/create`)
//         .then(response => {
//             dispatch({
//                 type: POST_TAREA,
//                 payload: response
//             })
//         })
//         .catch(e => console.log(e))
//     }

// }


export function deleteTarea(id) {

    return function (dispatch) {
        dispatch({ 
            type: DELETE_TAREA 
        });
        axios({
            method: 'delete',
            url: `${REACT_APP_API}/tareas/${id}`,
            payload: id
        }).catch(e => dispatch(e))
    }
}

// export function getAllTareas(id) {
//     return function(dispatch) {
//         dispatch({
//             type:GET_TAREAS
//         });
//         axios({
//             method: 'get',
//             url: `${REACT_APP_API}/tareas/${id}`,
//             payload: id
//         }).catch(e => dispatch(e))
//     }
// }

export function getAllTareas(id) {
    return function(dispatch) {
        return fetch(`${REACT_APP_API}/tareas/${id}`)  
        .then(response=>response.json())          
            .then(json=>{
                dispatch({          
                type: GET_TAREAS,
                payload: json
            })  
        })
    }
}

export const updateTarea = ({ id, body }) => {

    return (dispatch) => {
        dispatch({ type: UPDATE_TAREA });
        axios({
            method: 'put',
            url: `${REACT_APP_API}/tarea/${id}`,
            data: {
               ...body
            },
        }).catch(e => dispatch(e))
    }
}