export interface Product {
    id: number;
    name: string;
    price: number;
    description?: string;
    imageUrl: string;
    brand: string;
    originalPrice: number;
    discountPercentage: number;
} 