import { configureStore } from '@reduxjs/toolkit';//->middlewares
import productReducer from '../modules/productSlice';
import categoryReducer from '../modules/categorySlice';
//fun toolkit => 
const store = configureStore({
    reducer: {
        product: productReducer,
        category: categoryReducer,
    },
});
//state
export type RootState = ReturnType<typeof store.getState>;
//actions,
export type AppDispatch = typeof store.dispatch;

export default store;
