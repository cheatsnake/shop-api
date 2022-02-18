import { Category } from "../entities/category.entity";
import { ProductDto } from "../dto/product.dto";
import { Product } from "../entities/product.entity";
import { UpdateProductDto } from "../dto/updateProduct.dto";
import { ErrorHandler } from "../utils/error.handler";
import {
    CATEGORY_NOT_FOUND,
    INCORRECT_DATA,
    PRODUCT_NOT_FOUND,
} from "../constants/error.constants";

export class ProductService {
    async create(dto: ProductDto) {
        try {
            const category = await Category.findOne({ name: dto.category });
            if (!category) {
                throw ErrorHandler.notFound(CATEGORY_NOT_FOUND);
            }

            if (!dto.name || !dto.description || !dto.price || !dto.images) {
                throw ErrorHandler.incorrectRequest(INCORRECT_DATA);
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
            const product = await Product.findOne({
                where: { id: parseInt(id) },
                relations: ["category"],
            });

            if (!product) {
                throw ErrorHandler.notFound(PRODUCT_NOT_FOUND);
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
                throw ErrorHandler.notFound(CATEGORY_NOT_FOUND);
            }
            const product = await Product.find({
                where: { category },
                relations: ["category"],
                take: page,
                skip: page * limit - limit,
            });

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
            const product = await Product.findOne(dto.id, {
                relations: ["category"],
            });
            if (!product) {
                throw ErrorHandler.notFound(PRODUCT_NOT_FOUND);
            }

            const category = await Category.findOne({
                name: dto?.category || product.category.name,
            });

            if (!category) {
                throw ErrorHandler.notFound(CATEGORY_NOT_FOUND);
            }

            const updatedProduct = await Product.update(dto.id, {
                name: dto?.name || product.name,
                price: dto?.price || product.price,
                category: category,
                description: dto?.description || product.description,
                images: dto?.images || product.images,
                available:
                    dto?.available === undefined
                        ? product.available
                        : dto?.available,
                params: dto?.params || product.params,
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
                throw ErrorHandler.notFound(PRODUCT_NOT_FOUND);
            }
            const deletedProduct = await Product.delete({ id: parseInt(id) });
            return deletedProduct;
        } catch (error) {
            throw error;
        }
    }
}
