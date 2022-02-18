import { CATEGORY_ALREADY_EXISTS } from "../constants/error.constants";
import { ErrorHandler } from "../utils/error.handler";
import { Category } from "../entities/category.entity";

export class CategoryService {
    async create(name: string) {
        try {
            const isCategoryExist = await Category.find({ where: { name } });

            if (isCategoryExist.length)
                throw ErrorHandler.incorrectRequest(CATEGORY_ALREADY_EXISTS);

            const category = Category.create({ name });
            await category.save();
            return category;
        } catch (error) {
            throw error;
        }
    }

    async findAll() {
        try {
            const categories = await Category.find();
            return categories;
        } catch (error) {
            throw error;
        }
    }
}
