import { connection } from "../../src/configs/database.config";
import { UserDto } from "../../src/dto/user.dto";
import request from "supertest";
import app from "../../src/app";

const adminDto: UserDto = {
    email: "admin@test.com",
    password: "admin",
};

const categoryDto = { name: Date.now().toString() };
let adminToken: string;

describe("Category module", () => {
    beforeAll(async () => {
        await connection();
        const res = await request(app).post("/api/login").send(adminDto);
        adminToken = res.body.token;
    });

    test("POST /api/category - creating a category", async () => {
        const response = await request(app)
            .post("/api/category")
            .set("Authorization", `Bearer ${adminToken}`)
            .send(categoryDto);

        expect(response.statusCode).toEqual(201);
        expect(response.body.name).toEqual(categoryDto.name);
        expect(response.body.id).toBeDefined();
    });

    test("GET /api/category - get all categories", async () => {
        const response = await request(app).get("/api/category");

        expect(response.statusCode).toEqual(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test("POST /api/category - creating an existing category", async () => {
        const response = await request(app)
            .post("/api/category")
            .set("Authorization", `Bearer ${adminToken}`)
            .send(categoryDto);

        expect(response.statusCode).toEqual(400);
        expect(response.body.message).toEqual("Category already exists");
    });
});
