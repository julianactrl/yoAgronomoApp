import {
  REGISTER_USER_ERROR,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_LOGOUT_ERROR,
  GET_USER,
  LOADING_USER,
  UPDATE_USER
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
        userInfo: {},
        error: false,
        isLoading: true,
      };
    }
    case REGISTER_USER_SUCCESS: {
      return {
        ...state,
        user: action.payload,
        userInfo: action.payload,
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
    case GET_USER: {
      return{
        ...state,
        userInfo: action.payload,
        isLoading: false,
      }
    }
    case LOADING_USER:{
      return {
        ...state,
        isLoading: true,
      }
    }
    case USER_LOGOUT:
      return {
        isAuth: false,
        userInfo:{},
        user:{}
      };
    case USER_LOGOUT_ERROR: {
      return {
        error: true
      }
    }
    case UPDATE_USER: {
      return {
        ...state,
        user: action.payload,
        userInfo: action.payload,

      };
    }

    default:
      return state;
  }
};

export default userReducer;