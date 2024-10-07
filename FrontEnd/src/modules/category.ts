import { Product } from "./product";
export interface Category {
    id: number;
    name: string;
    quantity: number;
    products: Product[]; // ודא שהשדה הזה קיים
}