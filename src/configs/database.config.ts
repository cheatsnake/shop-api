import "dotenv/config";
import { createConnection } from "typeorm";

export const connection = async () =>
    await createConnection({
        type: "postgres",
        host: process.env.TYPEORM_HOST,
        port: Number(process.env.TYPEORM_PORT),
        username: process.env.TYPEORM_USERNAME,
        password: process.env.TYPEORM_PASSWORD,
        database: process.env.TYPEORM_DATABASE,
    });
