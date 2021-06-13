import {GET_EMPRESA_ID, POST_EMPRESA, GET_EMPRESA} from './../constants';

const initialState = {
    allEmpresas: [],
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
        case GET_EMPRESA:
            console.log(action.payload);
            return {
                ...state,
                allEmpresas: action.payload,
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