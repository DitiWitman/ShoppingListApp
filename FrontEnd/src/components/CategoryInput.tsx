import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';
import { Category } from '../modules/category';

interface CategoryInputProps {
    onAddProduct: (product: { name: string; categoryId: string; quantity: number; }) => void;
    categories: Category[];
    errors: { productName: string; category: string };
    products: any[]; // Adjust type as needed
}

const CategoryInput: React.FC<CategoryInputProps> = ({ onAddProduct, categories, errors }) => {
    const [productName, setProductName] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onAddProduct({ name: productName, categoryId: selectedCategory, quantity: 1 }); // Set default quantity to 1
        setProductName('');
        setSelectedCategory('');
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
            <TextField
                label="שם מוצר"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                error={!!errors.productName}
                helperText={errors.productName}
                sx={{ width: '120px' }} // Adjusted width
            />
            <FormControl sx={{ marginRight: '4px', minWidth: '120px' }}> {/* Adjusted minWidth */}
                <InputLabel>בחר קטגוריה</InputLabel>
                <Select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    error={!!errors.category}
                    sx={{ width: '120px' }} // Set width for select
                >
                    {categories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                            {category.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ minWidth: '120px', marginLeft: '4px' }} // Set a fixed width for the button
            >
                הוסף מוצר
            </Button>
        </Box>
    );
};

export default CategoryInput;
