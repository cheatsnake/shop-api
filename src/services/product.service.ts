import { Category } from "../entities/category.entity";
import { ProductDto } from "../dto/product.dto";
import { Product } from "../entities/product.entity";

export class ProductService {
    async create(dto: ProductDto) {
        try {
            const category = await Category.findOne({ name: dto.category });
            if (!category) {
                throw new Error();
            }

            const product = Product.create({ ...dto, category });
            await product.save();
            return product;
        } catch (error) {
            throw error;
        }
    }

    async findById(id: string) {}

    async findByCategory(category: string) {}

    async updateById(id: string, dto: ProductDto) {}

    async deleteById(id: string) {}
}
