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

    // Get all categories
    const fetchCategories = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5201/api/Category');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setLoading(false);
        }
    }; const fetchProductsFromApi = async () => { try { const response = await axios.get('http://localhost:5201/api/Product'); const productsFromApi: Product[] = response.data; setProducts(productsFromApi); setItemCount(productsFromApi.reduce((total, product) => total + product.amount, 0)); localStorage.setItem('products', JSON.stringify(productsFromApi)); } catch (error) { console.error('Error fetching products from API:', error); } }; // Call fetchStoredProducts in useEffect useEffect(() => { fetchCategories(); fetchStoredProducts(); // תישאר כמו שהיא }, []);  


    // Get all products from localStorage
    const fetchStoredProducts = () => {
        const storedProducts = localStorage.getItem('products');
        if (storedProducts) {
            const parsedProducts: Product[] = JSON.parse(storedProducts);
            const prodactFilter = parsedProducts.filter(product=>product.amount>0 );
            setProducts(prodactFilter);
            setItemCount(prodactFilter.reduce((total, product) => total + product.amount,0));
        }
        else{
            fetchProductsFromApi();
        }
    };

    // Handle adding a product
    const handleAddProduct = async (product: { name: string; categoryid: string; quantity: number; }) => {
        let error = { productName: '', category: '' };
        if (!product.name) error.productName = 'יש להזין שם מוצר';
        if (!product.categoryid) error.category = 'יש לבחור קטגוריה';
        setErrors(error);

        if (error.productName || error.category) return;

        const newProduct: Product = {
            id: Date.now(),
            name: product.name,
            categoryid: Number(product.categoryid),
            amount: product.quantity,
        };

        const existingProductIndex = products.findIndex(p => p.name === newProduct.name && p.categoryid === newProduct.categoryid);
        const updatedProducts = [...products];

        if (existingProductIndex >= 0) {
            updatedProducts[existingProductIndex].amount += newProduct.amount;
        } else {
            updatedProducts.push(newProduct);
        }

        setProducts(updatedProducts);
        setItemCount(prevCount => prevCount + product.quantity);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
    };

    //  make a order
    
    const handleConfirmOrder = async () => {
        setLoading(true); //state
        try {
            const responses = await Promise.all(products.map(product =>{
                const{id,...rest}=product;
             return  axios.post('http://localhost:5201/api/Product', rest)
         } ));
         //chack the response
            responses.forEach(response => console.log('Product saved:', response.data));
            // Clear the products list and local storage
            setProducts([]);
            setItemCount(0);
            localStorage.removeItem('products'); // Clear localStorage
            alert("ההזמנה אושרה!");
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const validationErrors = error.response.data.errors;
                let errorMessage = 'שגיאה בעת אישור ההזמנה:';

                if (validationErrors) {
                    Object.keys(validationErrors).forEach(key => {
                        errorMessage += ` ${key}: ${validationErrors[key].join(', ')}`;
                    });
                } else {
                    errorMessage += ' שגיאה לא ידועה.';
                }

                alert(errorMessage);
            } else {
                console.error('Error confirming order:', error);
                alert('שגיאה לא צפויה התרחשה.');
            }
        } finally {
            setLoading(false); 
        }
    };
    // text file
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

    useEffect(() => {
        fetchCategories();
        fetchStoredProducts();
    }, []);

    // Update quantity
    const updateQuantity = (productId: number, change: number) => {
        const updatedProducts = products.map(product =>
            product.id === productId
                ? { ...product, amount: Math.max(product.amount + change, 0) }
                : product
        );
        setProducts(updatedProducts);
        setItemCount(prevCount => prevCount + change);
        localStorage.setItem('products', JSON.stringify(updatedProducts));
    };

    const increaseQuantity = (productId: number) => updateQuantity(productId, 1);
    const decreaseQuantity = (productId: number) => updateQuantity(productId, -1);

    return (
        <Container>
            <Header itemCount={itemCount} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginTop: '20px' }}>
                <Button variant="contained" color="primary" onClick={exportToTXT} style={{ marginBottom: '8px' }}>
                    <Download /> ייצא לקובץ טקסט
                </Button>
                <Button variant="contained" color="primary" onClick={handleConfirmOrder} style={{ marginTop: '20px' }}>
                    אישור הזמנה
                </Button>
            </div>
            <CategoryInput onAddProduct={handleAddProduct} categories={categories} errors={errors} products={products} />
            {loading ? (
                <CircularProgress />
            ) : (
                <CategoryList products={products} categories={categories} setProducts={setProducts} setItemCount={setItemCount} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} />
            )}
        </Container>
    );
};

export default ShoppingDashboard;
