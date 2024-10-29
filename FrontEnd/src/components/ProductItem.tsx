import React from 'react';
import { useDispatch } from 'react-redux';
import { Product } from '../modules/product';
import { increaseQuantity, decreaseQuantity } from '../modules/productSlice';
import { Button, Typography, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

interface ProductItemProps {
    product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
    const dispatch = useDispatch();

    const handleIncrease = () => {
        dispatch(increaseQuantity(product.id));
    };

    const handleDecrease = () => {
        if (product.amount > 0) {
            dispatch(decreaseQuantity(product.id));
        }
    };

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            margin: '5px',
            border: 'none',
            padding: '5px',
            width: '150px',
        }}>
            <Button
                variant="outlined"
                color="secondary"
                onClick={handleDecrease}
                disabled={product.amount <= 0}
                size="small"
                sx={{ minWidth: '24px', padding: '2px' }}
            >
                <RemoveIcon fontSize="small" />
            </Button>
            <Typography variant="body2" sx={{
                margin: '0 5px',
                width: 'auto',
                textAlign: 'center',
                fontWeight: 'bold',
            }}>
                {product.name.length > 14 ? `${product.name.slice(0, 14)}...` : product.name}
                <span style={{ fontWeight: 'bold' }}> ({product.amount})</span>
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={handleIncrease}
                size="small"
                sx={{ minWidth: '24px', padding: '2px' }}
            >
                <AddIcon fontSize="small" />
            </Button>
        </Box>
    );
};

export default ProductItem;
