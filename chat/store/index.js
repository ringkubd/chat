import {combineReducers, configureStore} from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthSlice from "./service/auth/authSlice";
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist/es/constants";
import ErrorSlice from "./service/error";
import {authAPI} from "./service/auth/authAPI";

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,

};

const middleware = [
    authAPI.middleware,
];

const reducers = combineReducers({
    auth: AuthSlice.reducer,
    errors: ErrorSlice.reducer,
    [authAPI.reducerPath] : authAPI.reducer,
});
const persistedReducer = persistReducer(persistConfig, reducers);
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: {
            /* ignore persistance actions */
            ignoredActions: [
                FLUSH,
                REHYDRATE,
                PAUSE,
                PERSIST,
                PURGE,
                REGISTER
            ],
        }
    }).concat(middleware)
});
export const persistor = persistStore(store);
export const dispatch = (action) => store.dispatch(action);
