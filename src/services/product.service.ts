import { Category } from "../entities/category.entity";
import { ProductDto } from "../dto/product.dto";
import { Product } from "../entities/product.entity";
import { UpdateProductDto } from "../dto/updateProduct.dto";
import { Param } from "../entities/param.entity";

export class ProductService {
    async create(dto: ProductDto) {
        try {
            const category = await Category.findOne({ name: dto.category });
            if (!category) {
                throw new Error();
            }

            const paramsArray: Param[] = [];
            dto.params.forEach(async (elem) => {
                const param = await Param.findOne({
                    name: elem.name,
                    body: elem.body,
                });

                if (!param) {
                    const newParam = Param.create({
                        name: elem.name,
                        body: elem.body,
                    });
                    await newParam.save();
                    paramsArray.push(newParam);
                } else {
                    paramsArray.push(param);
                }
            });

            const product = Product.create({
                ...dto,
                category,
                params: paramsArray,
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
                relations: ["category", "params"],
            });
            if (!product) {
                throw new Error();
            }
            return product;
        } catch (error) {
            throw error;
        }
    }

    async findByCategory(ctg: string) {
        try {
            const category = await Category.findOne({ name: ctg });
            if (!category) {
                throw new Error();
            }
            const product = await Product.find({
                where: { category },
                relations: ["category", "params"],
            });
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
            const products = await Product.find({
                relations: ["category", "params"],
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
