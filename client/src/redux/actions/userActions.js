import axios from 'axios';
import {
REGISTER_USER_ERROR,REGISTER_USER_REQUEST,REGISTER_USER_SUCCESS,USER_LOGIN_REQUEST,USER_LOGIN_SUCCESS,USER_LOGIN_ERROR,USER_LOGOUT
} from '../constants';

const { REACT_APP_API } = process.env;

export const register = (body) => async (dispatch) =>{
   try{
   dispatch({
       type: REGISTER_USER_REQUEST
   })
   const config = {
       headers:{'Content-Type':'application/json'}
   }
   const {data} = await axios.post('http://localhost:3001/auth/register',body)
   dispatch({
       type: REGISTER_USER_SUCCESS,
       payload: data
   })
   alert('Registro exitoso')
   dispatch({
       type: USER_LOGIN_SUCCESS,
       payload:data
   })
   } catch(error){
   dispatch({
       type:REGISTER_USER_ERROR,
       payload: error
   })
   }
}

export const login = (body) => async (dispatch) =>{
    try{
    dispatch({
        type: USER_LOGIN_REQUEST
    })
    const config = {
        headers:{'Content-Type':'application/json'}
    }
    const {data} = await axios.post('http://localhost:3001/auth/login',body)
    dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data
    })
    } catch(error){
    dispatch({
        type:USER_LOGIN_ERROR,
        payload: error
    })
    }
 }




