import React from 'react';
import { Product } from '../modules/product';
import { Category } from '../modules/category'; // הייבוא של טיפוס הקטגוריה

interface CategoryListProps {
    products: Product[];
    categories: Category[]; // הוספת קטגוריות כפרופס
}

const CategoryList: React.FC<CategoryListProps> = ({ products, categories }) => {
    // יצירת מפת קטגוריות
    const categoriesMap = categories.reduce((acc: { [key: number]: string }, category) => {
        acc[category.id] = category.name;
        return acc;
    }, {});

    // חלוקת המוצרים לפי קטגוריות
    const groupedProducts = products.reduce((acc: { [key: number]: Product[] }, product) => {
        if (!acc[product.categoryid]) {
            acc[product.categoryid] = [];
        }
        acc[product.categoryid].push(product);
        return acc;
    }, {});

    return (
        <div>
            {Object.keys(groupedProducts).map(categoryId => (
                <div key={categoryId}>
                    <h3>קטגוריה {categoriesMap[Number(categoryId)] || categoryId}</h3> {/* הצגת שם הקטגוריה */}
                    <ul>
                        {groupedProducts[Number(categoryId)].map(product => (
                            <li key={product.id}>
                                {product.name} - כמות: {product.amount}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default CategoryList;
