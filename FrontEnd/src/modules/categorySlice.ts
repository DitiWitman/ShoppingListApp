import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Category {
    id: number;
    name: string;
}

// state
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
            state.categories = action.payload; // עדכון הקטגוריות ב-state
        },
    },
});

export const { setCategories } = categorySlice.actions;
export default categorySlice.reducer;
