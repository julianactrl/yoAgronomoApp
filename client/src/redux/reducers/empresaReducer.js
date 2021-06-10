import {GET_EMPRESA_ID, POST_EMPRESA} from './../constants';

const initialState = {
    empresas: [],
    empresaForId: [],
}

const empresaReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_EMPRESA_ID:
            return {
                ...state,
                empresaForId: action.payload,
            };
        case POST_EMPRESA:
            return {
                ...state,
                empresas: action.payload                
           };
            default: return state;
        }
    }
export default empresaReducer;