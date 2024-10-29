// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface Product {
//     name: string;
//     categoryId: string;
//     quantity: number;
// }

// // state
// interface ProductState {
//     products: Product[];
// }

// const initialState: ProductState = {
//     products: [],
// };

// // slice
// const productSlice = createSlice({
//     name: 'product',
//     initialState,
//     reducers: {
//         addProduct(state, action: PayloadAction<Product>) {
//             const existingProduct = state.products.find(product => product.name === action.payload.name && product.categoryId === action.payload.categoryId);
//             if (existingProduct) {
//                 existingProduct.quantity += action.payload.quantity; // עדכון הכמות
//             } else {
//                 state.products.push(action.payload); // הוספת מוצר חדש
//             }
//         },
//     },
// });

// export const { addProduct } = productSlice.actions;
// export default productSlice.reducer;
export { };
