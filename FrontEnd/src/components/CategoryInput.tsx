import React, { useState } from 'react';
import { Category } from '../modules/category';
import { MenuItem, Select, TextField, Button } from '@mui/material';

interface CategoryInputProps {
    onAddProduct: (product: { name: string; categoryId: string; quantity: number; }) => Promise<void>;
    categories: Category[];
}

const CategoryInput: React.FC<CategoryInputProps> = ({ onAddProduct, categories }) => {
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
        <div style={{ marginBottom: '20px' }}>
            <TextField
                label="שם המוצר"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                style={{ marginRight: '10px' }} // עיצוב נוסף
            />
            <Select
                value={selectedCategoryId}
                onChange={(e) => setSelectedCategoryId(e.target.value)}
                displayEmpty
                style={{ marginRight: '10px' }} // עיצוב נוסף
            >
                <MenuItem value="">
                    <em>בחר קטגוריה</em>
                </MenuItem>
                {categories.map(category => (
                    <MenuItem key={category.id} value={category.id}>
                        {category.name}
                    </MenuItem>
                ))}
            </Select>
            <TextField
                type="number"
                label="כמות"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                style={{ marginRight: '10px' }} // עיצוב נוסף
            />
            <Button onClick={handleAdd} variant="contained" color="primary">
                הוסף מוצר
            </Button>
        </div>
    );
};

export default CategoryInput;
