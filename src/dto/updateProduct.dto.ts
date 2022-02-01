export class UpdateProductDto {
    id: number;
    name: string;
    price: number;
    category: string;
    description: string;
    images: string[];
    available: boolean;
}
