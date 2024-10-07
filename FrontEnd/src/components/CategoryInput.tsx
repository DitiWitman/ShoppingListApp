import React, { useState } from 'react';
import { MenuItem, Select, TextField, Button, Box } from '@mui/material';
import { Category } from '../modules/category';
import { Product } from '../modules/product';

interface CategoryInputProps {
    onAddProduct: (product: { name: string; categoryId: string; quantity: number; }) => Promise<void>;
    categories: Category[];
    errors: { productName: string; category: string };
    onConfirmOrder: () => Promise<void>;
    products: Product[];
}

const CategoryInput: React.FC<CategoryInputProps> = ({ onAddProduct, categories, errors, onConfirmOrder, products }) => {
    const [productName, setProductName] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [quantity, setQuantity] = useState(1);

    const handleAdd = async () => {
        if (productName && selectedCategoryId) {
            await onAddProduct({ name: productName, categoryId: selectedCategoryId, quantity });
            setProductName('');
            setSelectedCategoryId('');
            setQuantity(1);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: 2,
                marginBottom: 4
            }}
            component="form"
            noValidate
            autoComplete="off"
        >
            <TextField
                label="שם המוצר"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                error={!!errors.productName}
                helperText={errors.productName}
                sx={{ minWidth: '150px' }}
            />
            <Select
                value={selectedCategoryId}
                onChange={(e) => setSelectedCategoryId(e.target.value)}
                displayEmpty
                error={!!errors.category}
                sx={{ minWidth: '150px' }}
            >
                <MenuItem value="">
                    <em>בחר קטגוריה</em>
                </MenuItem>
                {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                        {category.name}
                    </MenuItem>
                ))}
            </Select>
            <TextField
                type="number"
                label="כמות"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                inputProps={{ min: 1 }}
                sx={{ minWidth: '100px' }}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleAdd}
            >
                הוסף מוצר
            </Button>
            <Button
                variant="contained"
                color="secondary"
                sx={{ marginLeft: 2 }}
                onClick={onConfirmOrder}
            >
                אשר הזמנה
            {/* {/* </Button> */}
            
            </Button> 
        </Box>
    );
};

export default CategoryInput;
