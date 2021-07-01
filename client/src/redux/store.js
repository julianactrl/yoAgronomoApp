import {
    createStore,
    applyMiddleware,
    combineReducers
} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly'
import userReducer from "./reducers/userReducer"
import empresaReducer from './reducers/empresaReducer'
import weatherReducer from './reducers/weatherReducer'
import newsReducer from './reducers/newsReducer'
import loteReducer from './reducers/loteReducer'
import transporteReducer from './reducers/transporteReducer'
import cotizacionesReducer from './reducers/cotizacionesReducer'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import calendarReducer from './reducers/calendarReducer'
import gestionGastosReducer from './reducers/gestionGastosReducer'
import stockReducer from './reducers/stockReducer'
import agroApiReducer from './reducers/agroApiReducer'



const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['userReducer','empresaReducer'],
    blacklist: ['userReducer.logout']
}

const reducers = combineReducers({
    userReducer,
    empresaReducer,
    weatherReducer,
    newsReducer,
    loteReducer,
    cotizacionesReducer,
    transporteReducer,
    calendarReducer,
    gestionGastosReducer,
    stockReducer,
    agroApiReducer

})
const persistedReducer = persistReducer(persistConfig, reducers)




export const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
)
export const persistor = persistStore(store)