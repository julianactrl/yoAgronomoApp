import { GET_STOCK, CREATE_STOCK, UPDATE_STOCK, GET_STOCK_BY_ID } from "../constants"

const initialState = {
    stock: [],
    stockPorEmpresa: [],
}

const stockReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_STOCK:
            return {
                ...state,
                stock: action.payload
            }
        case GET_STOCK_BY_ID:
            return {
                ...state,
                stockPorEmpresa:action.payload
            }
        case UPDATE_STOCK:
            return {
                ...state,
                stockPorEmpresa: action.payload
            }
        default: 
            return state;
    }
}

export default stockReducer;