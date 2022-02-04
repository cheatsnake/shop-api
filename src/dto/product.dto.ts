import { Param } from "../entities/product.entity";

export class ProductDto {
    name: string;
    price: number;
    category: string;
    description: string;
    images: string[];
    params: Param[];
}
