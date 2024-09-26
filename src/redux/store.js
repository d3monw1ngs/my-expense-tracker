import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer } from "./auth/authSlice";
import { transactionsReducer } from "./transaction/transactionsSlice";
import { categoryReducer } from "./category/categorySlice";

export const authPersistConfig = {
    key: 'auth',
    storage,
    whitelist: ['token', 'sid']
};

export const store = configureStore({
    reducer: {
        auth: persistReducer(authPersistConfig, authReducer),
        transactions: transactionsReducer,
        category: categoryReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);