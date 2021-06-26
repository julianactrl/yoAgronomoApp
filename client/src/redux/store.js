import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import userReducer from "./reducers/userReducer";
import empresaReducer from "./reducers/empresaReducer";
import weatherReducer from "./reducers/weatherReducer";
import newsReducer from "./reducers/newsReducer";
import loteReducer from "./reducers/loteReducer";
import cotizacionesReducer from "./reducers/cotizacionesReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import calendarReducer from "./reducers/calendarReducer";
import premiumReducer from "./reducers/premiunReducer";
import transporteReducer from './reducers/transporteReducer'

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userReducer"],
  blacklist: ["userReducer.logout"],
};

const reducers = combineReducers({
  userReducer,
  empresaReducer,
  weatherReducer,
  newsReducer,
  loteReducer,
  cotizacionesReducer,
  calendarReducer,
  premiumReducer,
  transporteReducer
});
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);
export const persistor = persistStore(store);
