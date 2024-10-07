import React from 'react';
import { Product } from '../modules/product';
import { Category } from '../modules/category';
import {
    Button,
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Icon from '@mui/icons-material/Category'; // אייקון קטגוריה

interface CategoryListProps {
    products: Product[];
    categories: Category[];
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
    setItemCount: React.Dispatch<React.SetStateAction<number>>;
    increaseQuantity: (id: number) => void;
    decreaseQuantity: (id: number) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({
    products,
    categories,
    setProducts,
    setItemCount,
    increaseQuantity,
    decreaseQuantity,
}) => {
    const categorizedProducts = categories.map((category) => ({
        ...category,
        products: products.filter((product) => product.categoryid === category.id),
    }));

    return (
        <Box sx={{ padding: 2, textAlign: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                יש לאסוף את המוצרים מהמחלקות הבאות
            </Typography>
            <TableContainer component={Paper} sx={{ border: 'none' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {categories.map((category) => (
                                <TableCell key={category.id} align="center" sx={{ width: '200px' }}> {/* רוחב קבוע לכל עמודה */}
                                    <Icon sx={{ marginRight: 1 }} />
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                        {category.name}
                                    </Typography>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            {categorizedProducts.map((category) => (
                                <TableCell key={category.id} align="center">
                                    {category.products.map((product) => (
                                        <Box key={product.id} sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            margin: '5px',
                                            border: 'none', // לא להראות קו גבול
                                            padding: '5px',
                                            width: '150px', // רוחב קבוע לכל תיבה
                                        }}>
                                            <Button
                                                variant="outlined"
                                                color="secondary"
                                                onClick={() => {
                                                    if (product.amount <= 0) return; // אם הכמות אפס לא להפחית
                                                    decreaseQuantity(product.id);
                                                    if (product.amount === 1) {
                                                        setProducts((prev) => prev.filter(p => p.id !== product.id));
                                                    }
                                                }}
                                                disabled={product.amount <= 0}
                                                size="small"
                                                sx={{ minWidth: '24px', padding: '2px' }} // הקטנת גובה הכפתור
                                            >
                                                <RemoveIcon fontSize="small" />
                                            </Button>
                                            <Typography variant="body2" sx={{
                                                margin: '0 5px',
                                                width: 'auto',
                                                textAlign: 'center',
                                                fontWeight: 'bold', // בולט יותר
                                            }}>
                                                {product.name.length > 14 ? `${product.name.slice(0, 14)}...` : product.name}
                                                <span style={{ fontWeight: 'bold' }}> ({product.amount})</span> {/* הצגת הכמות */}
                                            </Typography>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => increaseQuantity(product.id)}
                                                size="small"
                                                sx={{ minWidth: '24px', padding: '2px' }} // הקטנת גובה הכפתור
                                            >
                                                <AddIcon fontSize="small" />
                                            </Button>
                                        </Box>
                                    ))}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default CategoryList;
