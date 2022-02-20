import { connection } from "../../src/configs/database.config";
import { ProductDto } from "../../src/dto/product.dto";
import { UserDto } from "../../src/dto/user.dto";
import request from "supertest";
import app from "../../src/app";

const productDto: ProductDto = {
    name: "test",
    price: 1,
    category: Date.now().toString(),
    description: "test",
    images: [],
    params: [],
};

const adminDto: UserDto = {
    email: "admin@test.com",
    password: "admin",
};

let adminToken: string;
let productId: number;

describe("Product module", () => {
    beforeAll(async () => {
        await connection();
        const res = await request(app).post("/api/login").send(adminDto);
        adminToken = res.body.token;
        await request(app)
            .post("/api/category")
            .set("Authorization", `Bearer ${adminToken}`)
            .send({ name: productDto.category });
    });

    test("POST /api/product - creating a product", async () => {
        const response = await request(app)
            .post("/api/product")
            .set("Authorization", `Bearer ${adminToken}`)
            .send(productDto);

        productId = response.body.id;
        expect(response.statusCode).toEqual(201);
        expect(response.body.name).toEqual(productDto.name);
        expect(response.body.id).toBeDefined();
    });

    test("GET /api/product/:id - get product by id", async () => {
        const response = await request(app).get(`/api/product/${productId}`);

        expect(response.statusCode).toEqual(200);
        expect(response.body.name).toEqual(productDto.name);
        expect(response.body.id).toEqual(productId);
    });

    test("GET /api/products/:category - get product by category", async () => {
        const response = await request(app).get(
            `/api/products/${productDto.category}`
        );

        expect(response.statusCode).toEqual(200);
        expect(response.body[0].category.name).toEqual(productDto.category);
    });

    test("GET /api/products - get all products", async () => {
        const response = await request(app).get(`/api/products`);

        expect(response.statusCode).toEqual(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test("PUT /api/product - update a product", async () => {
        const response = await request(app)
            .put("/api/product")
            .set("Authorization", `Bearer ${adminToken}`)
            .send({ ...productDto, name: "update", id: productId });

        expect(response.statusCode).toEqual(200);
        expect(response.body.affected).toEqual(1);
    });

    test("DELETE /api/product/:id - delete product by id", async () => {
        const response = await request(app)
            .delete(`/api/product/${productId}`)
            .set("Authorization", `Bearer ${adminToken}`);

        expect(response.statusCode).toEqual(200);
        expect(response.body.affected).toEqual(1);
    });
});
