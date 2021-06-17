import { GET_ALL_LOTES } from "../constants"

const initialState = {
    allLotes: [],
}

const lotesReducer = (state = initialState, action) => {

    switch(action.type) {
        case GET_ALL_LOTES:
            console.log('payloaddddddddddddd',action.payload); 
            return {
                ...state,
                allLotes : action.payload
            }
        default: 
            return state;
    }
}

export default lotesReducer