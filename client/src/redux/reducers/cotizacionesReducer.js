import { GET_DOLAR } from './../constants';

const initialState = {
    cotizaciones: []
};

const cotizacionesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DOLAR:
            return {
                ...state,
                cotizaciones: action.payload
            }
        default:
            return state;
    }
}

export default cotizacionesReducer;