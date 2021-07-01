import { GET_IMAGES,GET_SOIL_DATA,POST_POLYID,CLEAR_AGRO } from './../constants';

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
                case CLEAR_AGRO:
                return {
                    ...state,
                    agroImages: [],
                    agroSoil:[],
                    poliId:[]
                }
        default:
            return state;
    }
}

export default agroApiReducer;