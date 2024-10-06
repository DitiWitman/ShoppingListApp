import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../configuration/store';
import { fetchCategories } from '../modules/categoryManagement'; // יבוא הפונקציה
import { Box, Typography, Grid, Paper } from '@mui/material';

const CategoryList: React.FC = () => {
    const dispatch = useDispatch();
    const categories = useSelector((state: RootState) => state.category.categories);

    useEffect(() => {
        dispatch(fetchCategories() as any); // הוספת as any על מנת להימנע משגיאות
    }, [dispatch]);

    return (
        <Box sx={{ padding: 2 }}>
            <Grid container spacing={2}>
                {categories.map((category) => (
                    <Grid item xs={12} sm={6} md={4} key={category.id}>
                        <Paper sx={{ padding: 2 }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                {category.name}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default CategoryList;
