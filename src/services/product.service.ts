import { Category } from "../entities/category.entity";
import { ProductDto } from "../dto/product.dto";
import { Product } from "../entities/product.entity";
import { UpdateProductDto } from "../dto/updateProduct.dto";

export class ProductService {
    async create(dto: ProductDto) {
        try {
            const category = await Category.findOne({ name: dto.category });
            if (!category) {
                throw new Error();
            }

            const product = Product.create({
                ...dto,
                category,
            });
            await product.save();
            return product;
        } catch (error) {
            throw error;
        }
    }

    async findById(id: string) {
        try {
            const product = await Product.find({
                where: { id: parseInt(id) },
                relations: ["category"],
            });
            if (!product) {
                throw new Error();
            }
            return product;
        } catch (error) {
            throw error;
        }
    }

    async findByCategory(ctg: string, page = 1, limit = 10) {
        try {
            const category = await Category.findOne({ name: ctg });
            if (!category) {
                throw new Error();
            }
            const product = await Product.find({
                where: { category },
                relations: ["category"],
                take: page,
                skip: page * limit - limit,
            });
            if (!product) {
                throw new Error();
            }
            return product;
        } catch (error) {
            throw error;
        }
    }

    async findAll(page = 1, limit = 10) {
        try {
            const products = await Product.find({
                relations: ["category"],
                take: page,
                skip: page * limit - limit,
            });
            return products;
        } catch (error) {
            throw error;
        }
    }

    async updateById(dto: UpdateProductDto) {
        try {
            const product = await Product.findOne(dto.id);
            if (!product) {
                throw new Error();
            }
            const newCategory = await Category.findOne({ name: dto.category });
            if (!newCategory) {
                throw new Error();
            }
            const updatedProduct = await Product.update(dto.id, {
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
            const deletedProduct = await Product.delete({ id: parseInt(id) });
            return deletedProduct;
        } catch (error) {
            throw error;
        }
    }
}
