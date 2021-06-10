import {  GET_USERS} from './../constants';

const initialState = {
	user: {
		allUsers: [],
		isLoading: false,
		error: null
	},
	
};

const userReducer = (state = initialState, action) => {

	switch (action.type) {

		case GET_USERS:
			return {
				...state,
				user: {
					...state.user,
					allUsers: action.payload
				}
			}
		
		default: return state;
	}
}

export default userReducer;
