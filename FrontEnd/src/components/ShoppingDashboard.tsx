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
    const [errors, setErrors] = useState({ productName: '', category: '' });

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5201/api/Category');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
        setLoading(false);
    };

    const handleAddProduct = async (product: { name: string; categoryId: string; quantity: number; }) => {
        let error = { productName: '', category: '' };
        if (!product.name) error.productName = 'יש להזין שם מוצר';
        if (!product.categoryId) error.category = 'יש לבחור קטגוריה';
        setErrors(error);

        if (error.productName || error.category) return;

        try {
            const newProduct: Product = {
                id: Date.now(),
                name: product.name,
                categoryid: Number(product.categoryId),
                amount: product.quantity,
            };

            const existingProductIndex = products.findIndex(p => p.name === newProduct.name && p.categoryid === newProduct.categoryid);

            if (existingProductIndex >= 0) {
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex].amount += newProduct.amount;
                setProducts(updatedProducts);
                setItemCount(prevCount => prevCount + newProduct.amount);
            } else {
                setProducts([...products, newProduct]);
                setItemCount(prevCount => prevCount + product.quantity);
                await axios.post('http://localhost:5201/api/Product', newProduct);
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const handleConfirmOrder = async () => {
        try {
            alert("ההזמנה אושרה!");
            setProducts([]);
            setItemCount(0);
        } catch (error) {
            console.error('Error confirming order:', error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const increaseQuantity = (productId: number) => {
        const updatedProducts = products.map((product) =>
            product.id === productId ? { ...product, amount: product.amount + 1 } : product
        );
        setProducts(updatedProducts);
        setItemCount((prevCount) => prevCount + 1);
    };

    const decreaseQuantity = (productId: number) => {
        const updatedProducts = products.map((product) =>
            product.id === productId && product.amount > 0
                ? { ...product, amount: product.amount - 1 }
                : product
        );
        setProducts(updatedProducts);
        setItemCount((prevCount) => (prevCount > 0 ? prevCount - 1 : 0));
    };

    return (
        <Container>
            <Header itemCount={itemCount} />
            <CategoryInput
                onAddProduct={handleAddProduct}
                categories={categories}
                errors={errors}
                onConfirmOrder={handleConfirmOrder} // הוספת פרופס עבור אישור הזמנה
                products={products} // הוספת פרופס עבור המוצרים
            />
            {loading ? (
                <p>טוען קטגוריות...</p>
            ) : (
                <CategoryList
                    products={products}
                    categories={categories}
                    setProducts={setProducts}
                    setItemCount={setItemCount}
                    increaseQuantity={increaseQuantity}
                    decreaseQuantity={decreaseQuantity}
                />
            )}
        </Container>
    );
};

export default ShoppingDashboard;
