import { GET_TRANSPORTE , POST_TRANSPORTE, PUT_TRANSPORTE, DELETE_TRANSPORTE, GET_TRANSPORTE_ID} from "../constants"

const initialState = {
    allTransporte: [],
    transporteForId:[],
    transporte:{},
}

const transporteReducer = (state = initialState, action) => {

    switch(action.type) {
        case GET_TRANSPORTE:
            return {
                ...state,
                allTransporte: action.payload,
                transporte: action.payload
            }
        case GET_TRANSPORTE_ID:
            return {
                ...state,
                transporte: action.payload
            }
        case POST_TRANSPORTE: 
            return {
                ...state,
                createdTransporte : action.payload,
                allTransporte: action.payload
            }
        case PUT_TRANSPORTE: 
            return {
                ...state,
                transporteForId : action.payload
            }
     
        case DELETE_TRANSPORTE:
            return {
                ...state,
                transporte: action.payload
            }
        
        default: 
            return state;
    }
}

export default transporteReducer;