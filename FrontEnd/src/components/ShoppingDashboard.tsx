import React, { useState, useEffect } from 'react';
import { Container, Button } from '@mui/material';
import Header from './Header';
import CategoryInput from './CategoryInput';
import CategoryList from './CategoryList';
import { Product } from '../modules/product';
import { Category } from '../modules/category';
import axios from 'axios';

const ShoppingDashboard: React.FC = () => {
    const [itemCount, setItemCount] = useState(0);
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);

    // פונקציה למשיכת קטגוריות מהשרת
    const fetchCategories = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5201/api/Category');
            setCategories(response.data); // שמירת הקטגוריות ב-state
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
        setLoading(false);
    };

    // פונקציה להוספת מוצר
    const handleAddProduct = async (product: { name: string; categoryId: string; quantity: number; }) => {
        try {
            const newProduct: Product = {
                name: product.name,
                categoryid: Number(product.categoryId),
                amount: product.quantity,
            };

            // הוספת המוצר ל-state המקומי
            setProducts([...products, newProduct]);
            // עדכון ספירת המוצרים
            setItemCount(prevCount => prevCount + product.quantity);

            // שליחת המוצר לשרת
            await axios.post('http://localhost:5201/api/Product', newProduct);
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    // פונקציה לאישור הזמנה
    const handleConfirmOrder = async () => {
        try {
            // שליחת המוצרים למסד הנתונים
            await Promise.all(products.map(product =>
                axios.post('http://localhost:5201/api/Product', product)
            ));

            // אפס את רשימת המוצרים
            setProducts([]);
            setItemCount(0); // אפס את ספירת המוצרים

            alert("ההזמנה אושרה!");
        } catch (error) {
            console.error('Error confirming order:', error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <Container>
            <Header itemCount={itemCount} />
            <CategoryInput onAddProduct={handleAddProduct} categories={categories} /> {/* העברת הקטגוריות */}
            {loading ? (
                <p>טוען קטגוריות...</p>
            ) : (
                <CategoryList products={products} categories={categories} />
            )}
            <Button
                variant="contained"
                color="primary"
                onClick={handleConfirmOrder}
                style={{ marginTop: '20px' }} // עיצוב נוסף לכפתור
            >
                אישור הזמנה
            </Button>
        </Container>
    );
};

export default ShoppingDashboard;
