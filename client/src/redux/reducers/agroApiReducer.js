import { GET_IMAGES,GET_SOIL_DATA,POST_POLYID } from './../constants';

const initialState = {
    agroImages: [],
    agroSoil:[],
    poliId:[]
};

const agroApiReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_IMAGES:
            return {
                ...state,
                agroImages: action.payload
            }
        case GET_SOIL_DATA:
            return {
                ...state,
                agroSoil: action.payload
            }
            case POST_POLYID:
                return {
                    ...state,
                    poliId: action.payload
                }
        default:
            return state;
    }
}

export default agroApiReducer;