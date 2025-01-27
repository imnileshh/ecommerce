import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice'
import authReducer from './authSlice'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'

const authPersistConfig = {
    key: 'auth',
    storage,
}
const rootReducer = combineReducers({
    cart: cartReducer,
    auth: persistReducer(authPersistConfig, authReducer),
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: false,
        })
    }
})

export const persistor = persistStore(store)