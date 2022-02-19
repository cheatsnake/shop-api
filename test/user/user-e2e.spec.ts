import { UserDto } from "../../src/dto/user.dto";
import app from "../../src/app";
import { connection } from "../../src/configs/database.config";
import request from "supertest";

const userDto: UserDto = {
    email: Date.now().toString() + "@test.com",
    password: "test",
};

describe("User module (authorization)", () => {
    beforeAll(async () => {
        await connection();
    });

    test("POST /api/register - register a user", async () => {
        const response = await request(app).post("/api/register").send(userDto);

        expect(response.statusCode).toEqual(201);
        expect(response.body.token).toBeDefined();
    });

    test("POST /api/login - login to account", async () => {
        const response = await request(app).post("/api/login").send(userDto);

        expect(response.statusCode).toEqual(200);
        expect(response.body.token).toBeDefined();
    });

    test("POST /api/register - register with already used email", async () => {
        const response = await request(app).post("/api/register").send(userDto);

        expect(response.statusCode).toEqual(400);
        expect(response.body.message).toEqual("User already exists");
    });

    test("POST /api/login - login to account with wrong password", async () => {
        const response = await request(app)
            .post("/api/login")
            .send({ ...userDto, password: "fail" });

        expect(response.statusCode).toEqual(400);
        expect(response.body.message).toEqual("Wrong password");
    });
});
