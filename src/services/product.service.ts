import { ProductDto } from "../dto/product.dto";
import { Product } from "../entities/product.entity";

export class ProductService {
    async create(dto: ProductDto) {
        try {
            const product = Product.create(dto);
            await product.save();
            return product;
        } catch (error) {
            console.error(error);
        }
    }

    async findById(id: string) {}

    async findByCategory(category: string) {}

    async updateById(id: string, dto: ProductDto) {}

    async deleteById(id: string) {}
}
