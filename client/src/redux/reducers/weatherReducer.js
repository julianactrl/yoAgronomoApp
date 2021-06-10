import { GET_WEATHER } from './../constants';
const filtercity = (arr, name) => {
    const filtrado = arr.filter(c => c.name === name)
}
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
        default:
            return state;
    }
}

export default weatherReducer;