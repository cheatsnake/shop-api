interface Params {
    name: string;
    body: string;
}

export class ProductDto {
    name: string;
    price: number;
    category: string;
    description: string;
    images: string[];
    params: Params[];
}
