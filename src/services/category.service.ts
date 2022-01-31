import { Category } from "../entities/category.entity";

export class CategoryService {
    async create(name: string) {
        try {
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
