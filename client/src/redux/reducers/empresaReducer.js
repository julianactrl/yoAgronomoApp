import {GET_EMPRESA_ID, POST_EMPRESA, GET_EMPRESA, DELETE_EMPRESA,CLEAR_EMPRESA,CLEAR_ALL_EMPRESA} from './../constants';

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
        case DELETE_EMPRESA:
            return {
                ...state,
                empresaForId: action.payload
            }
            case CLEAR_EMPRESA:
            return {
                ...state,
                empresaForId: []
            }
            case CLEAR_ALL_EMPRESA:
            return {
                ...state,
                empresaForId: [],
                allEmpresas: [],
                empresas: []
            }
            default: return state;
        }
    }
export default empresaReducer;