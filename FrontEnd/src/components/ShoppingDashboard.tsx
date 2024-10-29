import React, { useState, useEffect } from 'react';
import { Container, CircularProgress, Snackbar } from '@mui/material';
import axios, { AxiosResponse } from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import Header from './Header';
import CategoryInput from './CategoryInput';
import CategoryList from './CategoryList';
import { Product } from '../modules/product';
import { Category } from '../modules/category';
import { setProducts, increaseQuantity, decreaseQuantity } from '../modules/productSlice';
import { setCategories } from '../modules/categorySlice';
import { RootState } from '../configuration/store';

const ShoppingDashboard: React.FC = () => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const dispatch = useDispatch();
    const products = useSelector((state: RootState) => state.product.products);
    const [categories, setCategoriesState] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({ productName: '', category: '' });


    //  products to local storage
    const saveProductsToLocalStorage = (products: Product[]) => {
        localStorage.setItem('products', JSON.stringify(products));
    };

    const loadProductsFromLocalStorage = (): Product[] => {
        try {
            const storedProducts = localStorage.getItem('products');
            if (!storedProducts) {
                return [];
            }
            const products: Product[] = JSON.parse(storedProducts);
            return products.filter((product: Product) => product.amount > 0 && product.name);
        } catch (error) {
            console.error('Error loading products from local storage:', error);
            return [];
        }
    };
    const fetchCategories = async (): Promise<void> => {
        setLoading(true);
        try {
            const response: AxiosResponse<Category[]> = await axios.get('http://localhost:5201/api/Category');
            setCategoriesState(response.data);
            dispatch(setCategories(response.data));
            console.log('Categories fetched:', response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
            setSnackbarMessage('שגיאה בטעינת קטגוריות.');
            setOpenSnackbar(true);
        } finally {
            setLoading(false);
        }
    };

    const fetchProductsFromApi = async (): Promise<void> => {
        if (products.length > 0) {
            return;
        }
        try {
            const response: AxiosResponse<Product[]> = await axios.get('http://localhost:5201/api/Product');
            const productsFromApi: Product[] = response.data.filter(product => product.amount > 0 && product.name);

            dispatch(setProducts(productsFromApi)); //Redux
            saveProductsToLocalStorage(productsFromApi); //local storage
           // const totalItemCount = productsFromApi.reduce((total, product) => total + product.amount, 0);
           // setItemCount(totalItemCount);
            console.log('Products from server:', productsFromApi);
        } catch (error) {
            console.error('Error fetching products:', error);
            setSnackbarMessage('שגיאה בטעינת מוצרים.');
            setOpenSnackbar(true);
        }
    };

    useEffect(() => {
        const loadProducts = async () => {
            console.log('   louding product.....  ');
           // debugger;
            const storedProducts = loadProductsFromLocalStorage();
            console.log(' stored products--', storedProducts);
            if (storedProducts.length > 0) {
                console.log('from local storage');
                dispatch(setProducts(storedProducts));
            } else {
                console.log('from Api');
                await fetchProductsFromApi();
            }
        };

        const fetchAllData = async () => {
            await Promise.all([loadProducts(), fetchCategories()]);
        };

        fetchAllData();
    }, [dispatch]);


    useEffect(() => {
        saveProductsToLocalStorage(products);
    }, [products]);


    useEffect(() => {
        fetchCategories();
    }, []);

    // Function to add a product
    const handleAddProduct = (product: { name: string; categoryId: string; amount: number }) => {
        debugger; 
        let error = { productName: '', category: '' };

        if (!product.name) error.productName = 'יש להזין שם מוצר';
        if (!product.categoryId) error.category = 'יש לבחור קטגוריה';

        setErrors(error);
        if (error.productName || error.category) 
        return;

        const newProduct: Product = {
            id: Date.now(),
            name: product.name,
            categoryid: Number(product.categoryId),
            amount: product.amount
        };
        const existingProductIndex = products.findIndex(p => p.name === newProduct.name && p.categoryid === newProduct.categoryid);
        if (existingProductIndex >= 0) {
            const updatedProducts = [...products];
            updatedProducts[existingProductIndex].amount += newProduct.amount; 
            dispatch(setProducts(updatedProducts)); 
        } else {
            dispatch(setProducts([...products, newProduct]));
        }

        // updade amount of products
        dispatch(increaseQuantity(newProduct.amount));
        saveProductsToLocalStorage(products); 
    };


    // Function to download order
    const handleDownloadOrder = () => {
        const data = products.map(product => `${product.name}: ${product.amount}`).join('\n');
        const blob = new Blob([data], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);

        const file = document.createElement('a');
        file.href = url;
        file.download = 'order.txt';
        document.body.appendChild(file);
        file.click();
        document.body.removeChild(file);
        URL.revokeObjectURL(url);

        setSnackbarMessage('🤗ההזמנה הועתקה בהצלחה');
        setOpenSnackbar(true);
    };

    const handleConfirmOrder = async () => {
        if (products.length === 0) {
            setSnackbarMessage('😳אין מוצרים ברשימה כדי לבצע הזמנה');
            setOpenSnackbar(true);
            return;
        }

        const validProducts = products.filter(product => product.amount > 0 && product.name);
        if (validProducts.length === 0) {
            setSnackbarMessage('אין מוצרים תקינים להזמנה.');
            setOpenSnackbar(true);
            return;
        }

        const productsToSend = validProducts.map(product => ({
          //  id: product.id,
            name: product.name,
            amount: product.amount,
            categoryid: product.categoryid
        }));

        try {
            for (const product of productsToSend) {
                //console.log('Data sent to API:', JSON.stringify(product, null, 2));
                const response = await axios.post('http://localhost:5201/api/Product', product);
                console.log('Response from API:', response.data);
            }

            setSnackbarMessage('ההזמנה בוצעה בהצלחה!🎉');
            setOpenSnackbar(true);
            dispatch(setProducts([]));
            saveProductsToLocalStorage([]);
            //the localStorage is empty
            localStorage.removeItem('products');
            //setItemCount(0);
        } catch (error: unknown) {
            console.error('Error saving order:', error);
            if (axios.isAxiosError(error)) {
                const responseError = error.response?.data;
                let errorMessage = `שגיאה: ${responseError?.message || 'שגיאה לא ידועה.'}`;
                if (responseError && responseError.errors) {
                    errorMessage += ' שגיאות: ';
                    Object.keys(responseError.errors).forEach(key => {
                        errorMessage += `${key}: ${responseError.errors[key].join(', ')}. `;
                    });
                }
                setSnackbarMessage(errorMessage);
            } else {
                setSnackbarMessage('שגיאה בלתי צפויה התרחשה.');
            }
            setOpenSnackbar(true);
        }
    };


    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const handleSetProducts: React.Dispatch<React.SetStateAction<Product[]>> = (value) => {
        if (typeof value === 'function') {
            const newProducts = value(products);
            dispatch(setProducts(newProducts));
        } else {
            dispatch(setProducts(value));
        }
    };

    return (
        <Container>
            <Header/>
            <CategoryInput
                onAddProduct={handleAddProduct}
                categories={categories}
                errors={errors}
                onDownloadOrder={handleDownloadOrder}
                onConfirmOrder={handleConfirmOrder}
            />
            {loading ? (
                <CircularProgress />
            ) : (
                <CategoryList
                    products={products}
                    categories={categories}
                    setProducts={handleSetProducts}
                   // setItemCount={setItemCount}
                    increaseQuantity={(id: number) => {
                        debugger;
                        const productToUpdate = products.find((p: Product) => p.id === id);
                        if (productToUpdate) {
                            dispatch(increaseQuantity(id));                           
                             //setItemCount((prev) => prev + 1);
                            saveProductsToLocalStorage(products.map(product => product.id === id ?
                                { ...product, amount: product.amount + 1 } : product));
                            console.log(`Increased quantity for product ID: ${id}`);
                        }
                    }}
                    decreaseQuantity={(id: number) => {
                        const productToUpdate = products.find((p: Product) => p.id === id);
                        if (productToUpdate && productToUpdate.amount > 0) {
                            dispatch(decreaseQuantity(id));
                           // setItemCount((prev) => prev - 1);
                            saveProductsToLocalStorage(products.map(product => product.id === id ?
                                { ...product, amount: product.amount - 1 } : product));
                            console.log(`Decreased quantity for product ID: ${id}`);
                        }
                    }}
                />
            )}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
            />
        </Container>
    );
};

export default ShoppingDashboard;
