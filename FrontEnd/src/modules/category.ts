import { Product } from "./product";
export interface Category {
    id: number;
    name: string;
    products: Product[]; // ודא שהשדה הזה קיים
}