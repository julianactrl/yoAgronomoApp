import {POST_TAREA, GET_TAREAS, DELETE_TAREA, UPDATE_TAREA} from '../constants';
import axios from 'axios';
import swal from 'sweetalert';
const { REACT_APP_API} = process.env



export function createTarea(body) {
    return async function(dispatch) {
        try {
            dispatch({
              type: POST_TAREA,
            });
            const config = {
              headers: { "Content-Type": "application/json" },
            };
            const { data } = await axios.post(
              `${REACT_APP_API}/tareas/create`,
              body,
              config
            );
            swal("Tarea creada correctamente", { icon: "success" });
            console.log(data)
          } catch (error) {
            swal("No se pudo crear la tarea", { icon: "warning" });
    }}
        };
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