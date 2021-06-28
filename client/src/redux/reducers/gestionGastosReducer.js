
import { GET_ALL_CLASIFICACIONES, CREATED_CLASIFICACION, GET_ALL_GASTOS, CREATED_GASTO} from './../constants';

const initialState = {
    clasificaciones: [],
    createdClasificacion:[],
    gastos: [],
    selectedClasificacion: '',
    createdGasto:[]
}

const gestionGastosReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_CLASIFICACIONES:
            return {
                ...state,
                clasificaciones: action.payload,
            };
        case CREATED_CLASIFICACION:
            return {
                ...state,
                createdClasificacion: action.payload,
            };
        case GET_ALL_GASTOS:
            return {
                ...state,
                gastos: action.payload,
            };
        case CREATED_GASTO:
            return {
                ...state,
                createdGasto: action.payload
            }
        case 'SELECTED_CLASIFICACION':
            return {
                ...state,
                selectedClasificacion: action.payload
            }
        default: return state;
        }
    }
export default gestionGastosReducer;