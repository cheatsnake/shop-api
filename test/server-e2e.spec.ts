import app from "../src/app";
import request from "supertest";

describe("Launching server", () => {
    it("Server is running", (done) => {
        request(app).get("/").expect(200).end(done);
    });
});
