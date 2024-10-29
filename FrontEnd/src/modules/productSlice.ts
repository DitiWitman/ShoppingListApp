import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from './product';

// arr from stat about proudact
interface ProductState {
    products: Product[];
    totalItems:number;
}

const initialState: ProductState = {
    products: [],
    totalItems: 0,
};

// slice
const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        //actions
        setProducts(state, action: PayloadAction<Product[]>) {
            //debugger;
            state.products = action.payload; 
            state.totalItems = action.payload.reduce((total, product) => total + product.amount, 0);
        },
        increaseQuantity(state, action: PayloadAction<number>) {
            const product = state.products.find(p => p.id === action.payload);
            if (product) {
                console.log('chack the amount');
                //debugger;
                product.amount += 1;
                console.log('amount of the Product', product.amount);
                state.totalItems += 1; 
            }
        },
        decreaseQuantity(state, action: PayloadAction<number>) {
            const product = state.products.find(p => p.id === action.payload);
            if (product && product.amount > 0) {
                product.amount -= 1;
                state.totalItems -= 1; //  totalItems
            }
            //debugger;
            //console.log(product?.amount);
            if (product?.amount === 0) {
                state.products = state.products.filter(p => p.id !== action.payload);
            }
            debugger;
        }

        
    },
    
});


export const { setProducts, increaseQuantity, decreaseQuantity } = productSlice.actions;
export default productSlice.reducer; 
