import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import userReducer from "./reducers/userReducer"
import empresaReducer from './reducers/empresaReducer'
import weatherReducer from './reducers/weatherReducer'
import newsReducer from './reducers/newsReducer'
import loteReducer from './reducers/loteReducer'
import agroConsultasReducer from './reducers/agroConsultasReducer'




const reducers = combineReducers({
    userReducer,
    empresaReducer,
    weatherReducer,
    newsReducer,
    loteReducer,
    agroConsultasReducer
})

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
)

export default store;