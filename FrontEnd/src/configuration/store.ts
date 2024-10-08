import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from '../modules/categorySlice';
import productReducer from '../modules/productManagement';

const store = configureStore({
    reducer: {
        category: categoryReducer,
        product: productReducer, 
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
