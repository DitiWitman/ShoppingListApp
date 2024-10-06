// src/configuration/store.ts

import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk'; // ייבוא של thunk
import categoryReducer from '../modules/categorySlice';

const store = configureStore({
    reducer: {
        category: categoryReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: true, // ודא ש-thunk מופעל
            serializableCheck: false, // אם אתה רוצה להשבית בדיקות על serializability
        }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
