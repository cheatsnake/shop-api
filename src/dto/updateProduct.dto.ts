import { Param } from "../entities/product.entity";

export class UpdateProductDto {
    id: number;
    name?: string;
    price?: number;
    category?: string;
    description?: string;
    images?: string[];
    params?: Param[];
    available?: boolean;
}
