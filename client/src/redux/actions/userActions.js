import axios from "axios";

import swal from "sweetalert";
import {
  REGISTER_USER_ERROR,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_ERROR,
  USER_LOGOUT,
  GET_USER,
  LOADING_USER,
  BEARER,
  UPDATE_USER,
} from "../constants";

const { REACT_APP_API } = process.env;

export const register = (body) => async (dispatch) => {
  try {
    dispatch({
      type: REGISTER_USER_REQUEST,
    });
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const { data } = await axios.post(
      `${REACT_APP_API}/auth/api/signup`,
      body,
      config
    );
    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: data,
    });
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    swal("Registro Exitoso",{icon:"success"});
    window.location.href = "/home";
  } catch (error) {
    swal("Credenciales Incorrectas", { icon: "warning" });
    dispatch({
      type: REGISTER_USER_ERROR,
      payload: error,
    });
  }
};

export const login =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: USER_LOGIN_REQUEST,
      });

      const data = await axios.post(`${REACT_APP_API}/auth/api/signin`, {
        email,
        password,
      });
      console.log(data.request.status);
      switch (data.request.status) {
        case 200:
          dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data.data,
          });
          localStorage.setItem("userInfo", JSON.stringify(data));
          window.location.href = "/home";
          break;
        case 401:
          dispatch({
            type: USER_LOGIN_ERROR,
            payload: data.error,
          });
          swal("Not allow", { icon: "warning" });
          break;
        case 500:
          dispatch({
            type: USER_LOGIN_ERROR,
            payload: data.error,
          });
          swal("Internal server error", { icon: "warning" });
          break;
        default:
          break;
      }
    } catch (error) {
      swal("Credenciales Incorrectas", { icon: "warning" });
      dispatch({
        type: USER_LOGIN_ERROR,
        payload: error,
      });
    }
  };

export const logout = () => {
  localStorage.removeItem("persist:root");
  return {
    type: USER_LOGOUT,
  };
};

export const getUser = () => {
  return function (dispatch) {
    dispatch({ type: LOADING_USER });
    return axios
      .get(`${REACT_APP_API}/auth/myProfile`, BEARER())
      .then(async (userInfo) => {
        if (userInfo.data.jwt)
          localStorage.setItem("jwt", JSON.stringify(userInfo.data.jwt));
        delete userInfo.data.jwt;
        dispatch({
          type: GET_USER,
          payload: userInfo.data,
        });
      });
  };
};

export const updateUser = (payload) => async (dispatch) => {
  return axios
    .patch(`${REACT_APP_API}/user/edit/${payload.id}`, payload.fd)
    .then((updated) => {
      dispatch({
        type: UPDATE_USER,
        payload: updated.fd,
      })
      window.location.reload()
    })
    .catch((e) =>
      console.log("Soy el error en update user", e.response?.data?.status)
    );
};
