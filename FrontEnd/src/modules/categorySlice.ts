import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from '../modules/category';

interface CategoryState {
    categories: Category[];
}

const initialState: CategoryState = {
    categories: [],
};

// slice
const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setCategories(state, action: PayloadAction<Category[]>) {
            state.categories = action.payload; 
        },
    },
});

export const { setCategories } = categorySlice.actions; 
export default categorySlice.reducer; 
