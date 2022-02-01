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

    async findById(id: string) {
        try {
            const product = await Product.findOne(parseInt(id));
            if (!product) {
                throw new Error();
            }
            return product;
        } catch (error) {
            throw error;
        }
    }

    async findByCategory(category: string) {
        try {
            const product = await Product.findOne(category);
            if (!product) {
                throw new Error();
            }
            return product;
        } catch (error) {
            throw error;
        }
    }

    async findAll() {
        try {
            const products = await Product.find();
            return products;
        } catch (error) {
            throw error;
        }
    }

    async updateById(id: string, dto: ProductDto) {
        try {
            const product = await Product.findOne(parseInt(id));
            if (!product) {
                throw new Error();
            }
            const newCategory = await Category.findOne({ name: dto.category });
            if (!newCategory) {
                throw new Error();
            }
            const updatedProduct = await Product.update(parseInt(id), {
                ...dto,
                category: newCategory,
            });
            return updatedProduct;
        } catch (error) {
            throw error;
        }
    }

    async deleteById(id: string) {
        try {
            const product = await Product.findOne(parseInt(id));
            if (!product) {
                throw new Error();
            }
            return;
        } catch (error) {
            throw error;
        }
    }
}
