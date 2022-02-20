import { connection } from "../../src/configs/database.config";
import { UserDto } from "../../src/dto/user.dto";
import request from "supertest";
import app from "../../src/app";
import { ProductDto } from "../../src/dto/product.dto";

const adminDto: UserDto = {
    email: "admin@test.com",
    password: "admin",
};

const productDto: ProductDto = {
    name: "test",
    price: 1,
    category: Date.now().toString(),
    description: "test",
    images: [],
    params: [],
};

let adminToken: string;
let productId: number;

describe("User module (authorization)", () => {
    beforeAll(async () => {
        await connection();
        const res = await request(app).post("/api/login").send(adminDto);
        adminToken = res.body.token;
        await request(app)
            .post("/api/category")
            .set("Authorization", `Bearer ${adminToken}`)
            .send({ name: productDto.category });
        const product = await request(app)
            .post("/api/product")
            .set("Authorization", `Bearer ${adminToken}`)
            .send(productDto);
        productId = product.body.id;
    });

    test("GET /api/cart/add/:id?amount=1 - add product to cart", async () => {
        const response = await request(app)
            .get(`/api/cart/add/${productId}?amount=1`)
            .set("Authorization", `Bearer ${adminToken}`);

        expect(response.statusCode).toEqual(200);
        expect(Array.isArray(response.body.products)).toBe(true);
        expect(response.body.id).toBeDefined();
    });

    test("GET /api/cart/add/:wrongId?amount=1 - add product with wrong id", async () => {
        const response = await request(app)
            .get(`/api/cart/add/${productId + 10000}?amount=1`)
            .set("Authorization", `Bearer ${adminToken}`);

        expect(response.statusCode).toEqual(404);
        expect(response.body.message).toEqual("Product not found");
    });

    test("GET /api/cart - get a cart", async () => {
        const response = await request(app)
            .get(`/api/cart`)
            .set("Authorization", `Bearer ${adminToken}`);

        expect(response.statusCode).toEqual(200);
        expect(Array.isArray(response.body.products)).toBe(true);
        expect(response.body.id).toBeDefined();
    });

    test("GET /api/cart/add/:id?amount=0 - remove product from a cart", async () => {
        const response = await request(app)
            .get(`/api/cart/add/${productId}?amount=0`)
            .set("Authorization", `Bearer ${adminToken}`);

        expect(response.statusCode).toEqual(200);
        expect(Array.isArray(response.body.products)).toBe(true);
        expect(response.body.id).toBeDefined();
    });

    afterAll(async () => {
        await request(app)
            .delete(`/api/product/${productId}`)
            .set("Authorization", `Bearer ${adminToken}`);
    });
});
