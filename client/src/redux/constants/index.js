
export const REGISTER_USER_REQUEST= "REGISTER_USER_REQUEST";
export const REGISTER_USER_SUCCESS= "REGISTER_USER_SUCCESS";
export const REGISTER_USER_ERROR= "REGISTER_USER_ERROR";

export const USER_LOGIN_REQUEST="USER_LOGIN_REQUEST";
export const USER_LOGIN_SUCCESS="USER_LOGIN_SUCCESS";
export const USER_LOGIN_ERROR="USER_LOGIN_ERROR";
export const USER_LOGOUT="USER_LOGOUT";
export const USER_LOGOUT_ERROR = "USER_LOGOUT_ERROR";
export const DELETE_ACCOUNT = "DELETE_ACCOUNT"
export const GET_USER = "GET_USER"
export const LOADING_USER = "LOADING_USER"
export const UPDATE_USER = "UPDATE_USER"



export const GET_EMPRESA = 'GET_EMPRESA';
export const GET_EMPRESA_ID = 'GET_EMPRESA_ID';
export const POST_EMPRESA = 'POST_EMPRESA';
export const DELETE_EMPRESA = 'DELETE_EMPRESA'

export const GET_WEATHER = "GET_WEATHER"
export const CLEAR_WEATHER = "CLEAR_WEATHER"

export const GET_NEWS = 'GET_NEWS';

export const UPDATE_EMPRESA= 'UPDATE_EMPRESA';

export const GET_ALL_LOTES = 'GET_ALL_LOTES';
export const CREATE_LOTE = 'CREATE_LOTE';

export const GET_TRANSPORTE = 'GET_TRANSPORTE';
export const POST_TRANSPORTE = 'POST_TRANSPORTE';
export const PUT_TRANSPORTE = 'PUT_TRANSPORTE';
export const DELETE_TRANSPORTE = 'DELETE_TRANSPORTE';

export const GET_DOLAR = 'GET_DOLAR';

export const POST_TAREA = 'POST_TAREA';
export const GET_TAREAS = 'GET_TAREAS';
export const DELETE_TAREA = 'DELETE_TAREA';
export const UPDATE_TAREA = 'UPDATE_TAREA';





export function BEARER() {
	if (JSON.parse(localStorage.getItem('jwt'))) {
		return {
			headers: {
				"Authorization": `Bearer ${JSON.parse(localStorage.getItem('jwt'))}`
			}
		}
	} else return null;
}