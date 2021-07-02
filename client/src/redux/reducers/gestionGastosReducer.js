
import { GET_ALL_CLASIFICACIONES, CREATED_CLASIFICACION, DELETE_CLASIFICACION, GET_ALL_GASTOS, CREATED_GASTO, GET_TOTAL, GASTO_BY_INPUT} from './../constants';

const initialState = {
    clasificaciones: [],
    createdClasificacion:[],
    gastos: [],
    selectedClasificacion: '',
    createdGasto:[],
    totalClasificaciones:[],
    total:[],
    gastoByInput:[]
}

const gestionGastosReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_CLASIFICACIONES:
            return {
                ...state,
                clasificaciones: action.payload
            };
        case CREATED_CLASIFICACION:
            return {
                ...state,
                createdClasificacion:  action.payload,
            };
        case DELETE_CLASIFICACION:
            return {
                ...state,
                createdClasificacion:  action.payload,
            }
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
        case 'TOTAL_CLASIFICACIONES':
            return {
                ...state,
                totalClasificaciones: action.payload
            }
        case GET_TOTAL : 
            return {
                ...state,
                total: action.payload
            }
        case GASTO_BY_INPUT:
            return {
                ...state,
                gastoByInput: action.payload
            }
        default: return state;
        }
    }
export default gestionGastosReducer;