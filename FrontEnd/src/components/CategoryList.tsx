// CategoryList.tsx
import React from 'react';
import { Category } from '../modules/category';
import { Product } from '../modules/product';
import ProductItem from './ProductItem';
import { Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Icon from '@mui/icons-material/Category';

interface CategoryListProps {
    products: Product[];
    categories: Category[];
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
    increaseQuantity: (id: number) => void;
    decreaseQuantity: (id: number) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ products, categories }) => {
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
                                <TableCell key={category.id} align="center" sx={{ width: '200px' }}>
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
                                        <ProductItem key={product.id} product={product} />
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
