import { GET_WEATHER,CLEAR_WEATHER } from './../constants';

const initialState = {
    weather: []
};

const weatherReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_WEATHER:
            return {
                ...state,
                weather: state.weather.concat(action.payload)
            }
        case CLEAR_WEATHER:
            return {
                ...state,
                weather: []
            }
        default:
            return state;
    }
}

export default weatherReducer;