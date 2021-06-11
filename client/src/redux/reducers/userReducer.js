import {
  REGISTER_USER_ERROR,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_ERROR,
  USER_LOGOUT,
} from "./../constants";

const initialState = {
  user: {},
  error: false,
  isLoading: false,
  userInfo: {},
  isAuth: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST: {
      return {
        ...state,
        user: {},
        error: false,
        isLoading: true,
      };
    }
    case REGISTER_USER_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        error: false,
      };
    }
    case REGISTER_USER_ERROR: {
      return {
        ...state,
        user: {},
        isLoading: false,
        error: true,
      };
    }
    case USER_LOGIN_SUCCESS: {
      return {
        ...state,
        user: {},
        userInfo: action.payload,
        isLoading: false,
        error: false,
        isAuth: true,
      };
    }

    default:
      return state;
  }
};

export default userReducer;
