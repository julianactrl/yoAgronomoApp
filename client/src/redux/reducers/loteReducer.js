import { GET_ALL_LOTES } from "../constants"

const initialState = {
    allLotes: [],
    detailLote:[]
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
        default: 
            return state;
    }
}

export default lotesReducer