import axios from 'axios';
import { setCategories } from '../modules/categorySlice'; // יבוא של הפונקציה ל-setCategories
import { AppDispatch } from '../configuration/store'; // יבוא של AppDispatch שלך

// פונקציה לשליפת הקטגוריות מהשרת
export const fetchCategories = () => {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await axios.get('http://localhost:5201/api/Category');
            dispatch(setCategories(response.data)); // עדכון ה-store עם הקטגוריות שהתקבלו
        } catch (error) {
            console.error('Error fetching categories:', error); // טיפול בשגיאות
        }
    };
};
