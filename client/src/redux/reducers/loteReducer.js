import { GET_ALL_LOTES , CREATE_LOTE} from "../constants"

const initialState = {
    allLotes: [],
    detailLote:[],
    manejoLote: [],
    createdLote:[],
    verifyRender:''
}

const lotesReducer = (state = initialState, action) => {

    switch(action.type) {
        case GET_ALL_LOTES:
            return {
                ...state,
                allLotes : action.payload
            }
        case 'GET_DETAIL_LOTE': 
            return {
                ...state,
                detailLote : action.payload
            }
        case 'GET_MANEJO': 
            return {
                ...state,
                manejoLote : action.payload
            }
     
        case CREATE_LOTE:
            return {
                ...state,
                createdLote: action.payload
            }
        case 'SET_VERIFY':
            return {
                ...state,
                verifyRender: action.payload
            }
        default: 
            return state;
    }
}

export default lotesReducer