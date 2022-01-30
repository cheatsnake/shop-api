import { Category } from "entities/category.entity";

export class ProductDto {
    name: string;
    price: number;
    description: string;
    images: string[];
}
