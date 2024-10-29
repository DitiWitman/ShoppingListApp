import axios from 'axios';
import { setCategories } from '../modules/categorySlice'; 
import { AppDispatch } from '../configuration/store'; 

export const fetchCategories = () => {
    return async (dispatch: AppDispatch) => {
        try {
            const response = await axios.get('http://localhost:5201/api/Category');
            console.log("the Category from server",response);
            dispatch(setCategories(response.data)); // store   
        } catch (error) {
            console.error('Error fetching categories:', error); 
        }
    };
};
