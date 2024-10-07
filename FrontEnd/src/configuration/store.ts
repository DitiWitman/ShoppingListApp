import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import categoryReducer from '../modules/categorySlice';
import productReducer from '../modules/productManagement'; // יבוא של ניהול מוצרים

const store = configureStore({
    reducer: {
        category: categoryReducer,
        product: productReducer, // הוספת ניהול מוצרים ל-store
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: true,
            serializableCheck: false,
        }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
