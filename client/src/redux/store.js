import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly'
import userReducer from "./reducers/userReducer"
import empresaReducer from './reducers/empresaReducer'



const reducers = combineReducers({
    userReducer,
    empresaReducer
})

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
)

export default store;