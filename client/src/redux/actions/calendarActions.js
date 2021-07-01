import {
    POST_TAREA,
    GET_TAREAS,
    DELETE_TAREA,
    UPDATE_TAREA,
    RESET_TAREAS,
    GET_TAREA_ID
} from '../constants';
import axios from 'axios';
import swal from 'sweetalert';
const {
    REACT_APP_API
} = process.env

export function getTarea(id) {
    return function(dispatch) {
        return fetch(`${REACT_APP_API}/tareas/tarea/${id}`)
        .then(response=>response.json())          
            .then(json=>{
                dispatch({          
                type: GET_TAREA_ID,
                payload: json
            })
        })
    }
}

export function createTarea(body) {
    return async function (dispatch) {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                },
            };
            const {
                data
            } = await axios.post(
                `${REACT_APP_API}/tareas/create`,
                body,
                config
            );
            dispatch({
                type: POST_TAREA,
                payload: data
            });
            swal("Tarea creada correctamente", {
                icon: "success"
            });
            console.log(data)
        } catch (error) {
            swal("No se pudo crear la tarea", {
                icon: "warning"
            });
        }
    }
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

  
export const resetTareas = () => {
    return (dispatch) => {
      dispatch({
        type: RESET_TAREAS,
      });
    };
  };

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
    return function (dispatch) {
        return fetch(`${REACT_APP_API}/tareas/${id}`)
            .then(response => response.json())
            .then(json => {
                dispatch({
                    type: GET_TAREAS,
                    payload: json
                })
                console.log(json)
            })
    }
}

export const updateTarea = ({
    id,
    tarea,
    fecha,
    estado,
    empresaId
}) => {

    return (dispatch) => {
        dispatch({
            type: UPDATE_TAREA
        });
        axios({
            method: 'patch',
            url: `${REACT_APP_API}/tareas/${id}`,
            data: {
                id,
                tarea,
                fecha,
                estado,
                empresaId
            },
        }).catch(e => dispatch(e))
    }
}
// export const updateTarea = (id) => async (dispatch) => {
//     return axios
//       .patch(`${REACT_APP_API}/tareas/${id}`)
//       .then((updated) => {
//         dispatch({
//           type: UPDATE_TAREA,
         
//         });
//         window.location.reload();
//       })
//       .catch((e) =>
//         console.log(e)
//       );
//   };