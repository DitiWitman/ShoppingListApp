import React, { useState, useEffect } from 'react';
import { Container, Button, CircularProgress } from '@mui/material';
import { Download } from '@mui/icons-material';
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
    const [selectedCategoryName, setSelectedCategoryName] = useState<string>('');

    // Fetch categories from the API
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

    // Handle adding a product
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

            // Set selected category name
            const category = categories.find(cat => cat.id === Number(product.categoryId));
            if (category) {
                setSelectedCategoryName(category.name);
            }

            // Check for existing product
            const existingProductIndex = products.findIndex(p => p.name === newProduct.name && p.categoryid === newProduct.categoryid);
            const updatedProducts = [...products];

            if (existingProductIndex >= 0) {
                updatedProducts[existingProductIndex].amount += newProduct.amount;
            } else {
                updatedProducts.push(newProduct);
            }

            setProducts(updatedProducts);
            setItemCount(prevCount => prevCount + product.quantity);
            await axios.post('http://localhost:5201/api/Product', newProduct);
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    // Handle confirming the order
    const handleConfirmOrder = async () => {
        try {
            alert("ההזמנה אושרה!");
            setProducts([]);
            setItemCount(0);
            localStorage.removeItem('products');
            setSelectedCategoryName('');
        } catch (error) {
            console.error('Error confirming order:', error);
        }
    };

    // Export products to a text file
    const exportToTXT = () => {
        const storedProducts = localStorage.getItem('products');
        if (!storedProducts) {
            alert("אין מוצרים לייצוא.");
            return;
        }

        const productsToExport = JSON.parse(storedProducts) as Product[];
        const data = productsToExport.map(product =>
            `שם המוצר: ${product.name}, כמות: ${product.amount}`
        ).join('\n');

        const blob = new Blob([data], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'products.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    // Fetch categories and products from localStorage on component mount
    useEffect(() => {
        fetchCategories();
        const storedProducts = localStorage.getItem('products');
        if (storedProducts) {
            const parsedProducts: Product[] = JSON.parse(storedProducts);
            setProducts(parsedProducts);
            setItemCount(parsedProducts.reduce((total: number, product: Product) => total + product.amount, 0));
        }
    }, []);

    // Increase quantity of a product
    const increaseQuantity = (productId: number) => {
        const updatedProducts = products.map(product =>
            product.id === productId ? { ...product, amount: product.amount + 1 } : product
        );
        setProducts(updatedProducts);
        setItemCount(prevCount => prevCount + 1);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
    };

    // Decrease quantity of a product
    const decreaseQuantity = (productId: number) => {
        const updatedProducts = products.map(product =>
            product.id === productId && product.amount > 0
                ? { ...product, amount: product.amount - 1 }
                : product
        );
        setProducts(updatedProducts);
        setItemCount(prevCount => (prevCount > 0 ? prevCount - 1 : 0));
        localStorage.setItem('products', JSON.stringify(updatedProducts));
    };

    return (
        <Container>
            <Header itemCount={itemCount} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginTop: '20px' }}>
                <Button variant="contained" color="primary" onClick={exportToTXT} style={{ marginBottom: '8px' }}>
                    <Download /> ייצא לקובץ טקסט
                </Button>
                <Button variant="contained" color="primary" onClick={handleConfirmOrder}>
                    אישור הזמנה
                </Button>
            </div>

            <CategoryInput
                onAddProduct={handleAddProduct}
                categories={categories}
                errors={errors}
                products={products}
            />
            {loading ? (
                <CircularProgress />
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
