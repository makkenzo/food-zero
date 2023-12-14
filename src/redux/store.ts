import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer } from 'redux-persist';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import persistStore from 'redux-persist/es/persistStore';
import storage from 'redux-persist/lib/storage';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import dataReducer from './slices/dataSlice';
import cardReducer from './slices/cardSlice';
import statusReducer from './slices/statusSlice';

const SECRET_KEY = process.env.SECRET_KEY ?? 'my-super-secret-key';

const transforms = [
    encryptTransform({
        secretKey: SECRET_KEY,
        onError: function (error) {
            console.log('🚀 ~ encryptTransform ~ error:', error);
        },
    }),
];

const rootReducer = combineReducers({
    auth: authReducer,
    data: dataReducer,
    cart: cartReducer,
    card: cardReducer,
    status: statusReducer,
});

const persistConfig = {
    key: 'root',
    storage,
    transforms,
    whitelist: ['auth', 'cart', 'card', 'status'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    devTools: true,
    middleware: [
        ...getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: true,
            },
        }),
    ],
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
