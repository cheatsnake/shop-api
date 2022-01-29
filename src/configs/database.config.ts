import "dotenv/config";
import { Cart } from "../entities/cart.entity";
import { Category } from "../entities/category.entity";
import { Param } from "../entities/param.entity";
import { Product } from "../entities/product.entity";
import { User } from "../entities/user.entity";
import { createConnection } from "typeorm";

export const connection = async () => {
    try {
        return await createConnection({
            type: "postgres",
            host: process.env.TYPEORM_HOST,
            port: Number(process.env.TYPEORM_PORT),
            username: process.env.TYPEORM_USERNAME,
            password: process.env.TYPEORM_PASSWORD,
            database: process.env.TYPEORM_DATABASE,
            entities: [User, Product, Param, Category, Cart],
            synchronize: true,
        });
    } catch (error) {
        console.error(error);
    }
};
