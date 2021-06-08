import axios from 'axios';
import {
	GET_USERS,
} from '../constants';

// const { REACT_APP_API } = process.env;

// export const getUsers = (page) => {
// 	return function (dispatch) {
// 		return axios.get(`${REACT_APP_API}users?page=`+ page)
// 			.then((user) => {
// 				dispatch(
// 					{
// 						type: GET_USERS,
// 						payload: user.data
// 					}
// 				)
// 			})
// 			.catch((err) => {
// 				dispatch({
// 					type: GET_USERS,
//                     id: err.response,
// 				})
// 			})
// 	}
// }