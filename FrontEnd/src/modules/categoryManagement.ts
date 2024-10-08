import axios from 'axios';
import { setCategories } from '../modules/categorySlice'; 
import { AppDispatch } from '../configuration/store'; 
export const fetchCategories = () => {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await axios.get('http://localhost:5201/api/Category');
            dispatch(setCategories(response.data)); // עדכון ה-store עם הקטגוריות שהתקבלו
        } catch (error) {
            console.error('Error fetching categories:', error); 
        }
    };
};
