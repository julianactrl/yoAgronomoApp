import {POST_TAREA, GET_TAREAS, DELETE_TAREA, UPDATE_TAREA} from './../constants'

const initialState = {
    tareas: []
}

const calendarReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_TAREAS:
            return {
                ...state,
            tareas: action.payload,
            };
        case POST_TAREA:
            
            return {
                ...state,
                tareas: action.payload,
            };    
        case DELETE_TAREA:
            return {
                ...state,
                tareas: action.payload                
           };
        case UPDATE_TAREA:
            return {
                ...state,
                tareas: action.payload
            }
            default: return state;
        }
    }
export default calendarReducer;