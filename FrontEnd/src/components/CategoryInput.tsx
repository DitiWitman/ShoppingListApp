import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';
import { Container, Row, Col } from 'react-bootstrap';
import { Category } from '../modules/category';

interface CategoryInputProps {
    onAddProduct: (product: { name: string; categoryId: string; amount: number; }) => void;
    categories: Category[];
    errors: { productName: string; category: string };
    onDownloadOrder: () => void;
    onConfirmOrder: () => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
    onAddProduct,
    categories,
    errors,
    onDownloadOrder,
    onConfirmOrder
}) => {
    const [productName, setProductName] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [nameError, setNameError] = useState('');    

    const handleSubmit = (event: React.FormEvent) => {
        //debugger;
        event.preventDefault();
        if (nameError) return; 
        onAddProduct({ name: productName, categoryId: selectedCategory, amount: 1 });
        console.log('add this product', productName);
        setProductName('');
        setSelectedCategory('');
        setNameError(''); 
    };

    const handleProductNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^[a-zA-Zא-ת\s]*$/.test(value) || value === '') {
            setProductName(value);
            setNameError(''); 
        } else {
            setNameError('נא להזין רק אותיות'); 
        }
    };

    return (
        <Container fluid className="p-3">
            <Row className="align-items-center mb-3">
                <Col xs={12} md={8} className="d-flex justify-content-start mb-2 mb-md-0">
                    <TextField
                        label="שם מוצר"
                        value={productName}
                        onChange={handleProductNameChange}
                        error={!!nameError || !!errors.productName}
                        helperText={nameError || errors.productName}
                        sx={{ width: '150px', minWidth: '150px', fontSize: '1.2rem' }}
                    />
                    <FormControl sx={{ marginX: '8px', minWidth: '150px' }} variant="outlined">
                        <InputLabel htmlFor="category-select" sx={{ background: 'white', padding: '0 4px' }}>
                            בחר קטגוריה
                        </InputLabel>
                        <Select
                            id="category-select"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            error={!!errors.category}
                            displayEmpty
                        >
                            <MenuItem value="" disabled>
                                <em>בחר קטגוריה</em>
                            </MenuItem>
                            {categories.map(category => (
                                <MenuItem key={category.id} value={category.id}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </Select>
                        <Box color="error.main">{errors.category}</Box>
                    </FormControl>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="small"
                        sx={{ marginLeft: '8px', fontSize: '0.9rem', paddingX: '8px' }}
                        onClick={handleSubmit}
                    >
                        הוסף מוצר
                    </Button>
                </Col>

                <Col xs={12} md={4} className="d-flex justify-content-end flex-wrap"> {/* שינוי פה */}
                    <Button
                        variant="contained"
                        color="success"
                        onClick={onConfirmOrder}
                        className="me-2"
                        size="small"
                        sx={{ fontSize: '0.9rem', paddingX: '8px', flexGrow: 1 }} // הוספת flexGrow
                    >
                        אישור הזמנה
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={onDownloadOrder}
                        size="small"
                        sx={{ fontSize: '0.9rem', paddingX: '8px', flexGrow: 1 }} // הוספת flexGrow
                    >
                        הורד הזמנה
                    </Button>
                </Col>
            </Row>
        </Container>
    );

};

export default CategoryInput;
