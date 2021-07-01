import {
  GET_EMPRESA_ID,
  POST_EMPRESA,
  GET_EMPRESA,
  UPDATE_EMPRESA,
  DELETE_EMPRESA,
  CLEAR_EMPRESA,
  CLEAR_ALL_EMPRESA
} from "../constants";
import axios from "axios";
const { REACT_APP_API } = process.env;
console.log(REACT_APP_API)

export function getAllEmpresas(id) {
  return function (dispatch) {
    return fetch(`${REACT_APP_API}/empresa/user/${id}`)
      .then((response) => response.json())
      .then((json) => {
        dispatch({
          type: GET_EMPRESA,
          payload: json,
        });
      });
  };
}

export function getEmpresa(id) {
  return function (dispatch) {
    return fetch(`${REACT_APP_API}/empresa/${id}`)
      .then((response) => response.json())
      .then((json) => {
        dispatch({
          type: GET_EMPRESA_ID,
          payload: json,
        });
      });
  };
}

export const postEmpresa = (payload) => async (dispatch) => {
  console.log("POST EMPRESA", payload);
  return axios
    .post(`${REACT_APP_API}/empresa/create/`, payload.fd)
    .then((update) => {
      dispatch({
        type: POST_EMPRESA,
        payload: update,
      });
      // window.location.reload()
    })
    .catch((e) =>
      console.log("soy e error en create empresa", e.response?.data?.status)
    );
};

export const updateEmpresa = (payload) => async (dispatch) => {
  return axios
    .patch(`${REACT_APP_API}/empresa/${payload.id}`, payload.fd)
    .then((updated) => {
      dispatch({
        type: UPDATE_EMPRESA,
        payload: updated.fd,
      });
      window.location.reload();
    })
    .catch((e) =>
      console.log("Soy el error en update empresa", e.response?.data?.status)
    );
};

export const deleteEmpresa = (id) => {
  return (dispatch) => {
    dispatch({ type: DELETE_EMPRESA });
    axios({
      method: "delete",
      url: `${REACT_APP_API}/empresa/delete/${id}`,
      payload: id,
    }).catch((e) => dispatch(e));
  };
};
// export function deleteEmpresa(id){
//     return {
//         type: 'DELETE_EMPRESA',
//         payload: id
//     }
// }

export const clearEmpresa = () => {
  return{
      type: CLEAR_EMPRESA
  }
}

export const clearAllEmpresa = () => {
  return{
      type: CLEAR_ALL_EMPRESA
  }
}
